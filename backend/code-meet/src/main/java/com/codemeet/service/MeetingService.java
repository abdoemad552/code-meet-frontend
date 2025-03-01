package com.codemeet.service;

import com.codemeet.entity.Meeting;
import com.codemeet.entity.MeetingStatus;
import com.codemeet.entity.Participant;
import com.codemeet.entity.User;
import com.codemeet.repository.MeetingRepository;
import com.codemeet.utils.dto.InstantMeetingRequest;
import com.codemeet.utils.dto.MeetingResponse;
import com.codemeet.utils.dto.ParticipantRequest;
import com.codemeet.utils.dto.ScheduleMeetingRequest;
import com.codemeet.utils.exception.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final NotificationService notificationService;
    private final ParticipantService participantService;
    private final UserService userService;
    public MeetingService
            (MeetingRepository meetingRepository,
             NotificationService notificationService,
             ParticipantService participantService,
             UserService userService)
    {
        this.meetingRepository = meetingRepository;
        this.notificationService=notificationService;
        this.participantService = participantService;
        this.userService=userService;
    }


   public List<MeetingResponse> getPreviousMeetings(Integer userId){

        return meetingRepository.getPreviousMeetings(userId);
    }
  public   List<MeetingResponse> getScheduledMeetings(Integer userId){

        return meetingRepository.getScheduledMeetings(userId);
    }
    public MeetingResponse scheduleMeeting(ScheduleMeetingRequest scheduledMeetingRequest)
    {
        //schedule meeting

        User creator=userService.getUserEntityById(scheduledMeetingRequest.creatorId());
        Meeting scheduledMeeting=new Meeting
                (       scheduledMeetingRequest.title(),
                        scheduledMeetingRequest.description(),
                        creator,
                        scheduledMeetingRequest.startTime(),
                        MeetingStatus.SCHEDULED
                );
       Meeting savedMeeting= meetingRepository.save(scheduledMeeting);

       //add participants and creator to list of participants
       Set<Participant> participants = new HashSet<>();
       scheduledMeetingRequest.participants().forEach((p)->{

           User user=userService.getUserEntityByUsername(p);
           participants.add(new Participant(savedMeeting,user));
       });
       participants.add(new Participant(savedMeeting,creator));

       participantService.addParticipants(participants);

        //todo: send notifications to participants
        //todo:  schedule job to run at given time which notifies creator client to start the meeting now
        // todo: and notifies all participants that there is a meeting now

        return new MeetingResponse(savedMeeting.getId(), savedMeeting.getTitle(),savedMeeting.getStartsAt());
    }
    public MeetingResponse startInstantMeeting(InstantMeetingRequest instantMeetingRequest)
    {

        // create instant meeting
        User creator=userService.getUserEntityById(instantMeetingRequest.creatorId());
        Meeting instantMeeting=new Meeting
                (       instantMeetingRequest.title(),
                        instantMeetingRequest.description(),
                        creator,
                        Instant.now(),
                        MeetingStatus.RUNNING
                );
        Meeting savedMeeting= meetingRepository.save(instantMeeting);
        // add creator only to participants here
        Set<Participant>participants =new HashSet<>();
        participants.add(new Participant(savedMeeting,creator));
        participantService.addParticipants(participants);

        //todo:  notify creator client to start the meeting now
        return new MeetingResponse(savedMeeting.getId(), savedMeeting.getTitle(),savedMeeting.getStartsAt());
    }

    @Transactional
    public Boolean addParticipantToMeeting(ParticipantRequest participantRequest)
    {
        //todo:possible to check cache before hitting DB

        User user= userService.getUserEntityById(participantRequest.participantId());

        Meeting meeting=meetingRepository.findById(participantRequest.meetingId())
                .orElseThrow(()-> new EntityNotFoundException("Meeting with id= "+participantRequest.meetingId()+" is not found"));


        Participant participant=new Participant(meeting,user);
        participantService.addParticipant(participant);

        return true;
    }
    @Transactional
    public  Boolean removeParticipantFromMeeting(ParticipantRequest participantRequest)
    {
        //todo:possible to check cache before hitting DB


        participantService.removeParticipant(participantRequest);
        return true;
    }
    public void triggerMeeting()
    {
        //todo: this function sends notifying logic for creator and other participants and called by scheduled job at specific time
    }

}
