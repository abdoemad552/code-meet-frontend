package com.codemeet.controller;

import com.codemeet.service.MeetingService;
import com.codemeet.service.ParticipantService;
import com.codemeet.utils.dto.InstantMeetingRequest;
import com.codemeet.utils.dto.MeetingResponse;
import com.codemeet.utils.dto.ParticipantRequest;
import com.codemeet.utils.dto.ScheduleMeetingRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meeting")
public class MeetingController {

private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @GetMapping("/scheduled/{userId}")
    public ResponseEntity<List<MeetingResponse>>getScheduledMeetings(@PathVariable Integer userId)
    {
        return ResponseEntity.ok(meetingService.getScheduledMeetings(userId));
    }
    @GetMapping("/previous/{userId}")
    public ResponseEntity<List<MeetingResponse>>getPreviousMeetings(@PathVariable Integer userId)
    {
        return ResponseEntity.ok(meetingService.getPreviousMeetings(userId));
    }
    @PostMapping("/schedule")
    public ResponseEntity<MeetingResponse>  scheduleMeeting(@RequestBody ScheduleMeetingRequest meeting)
    {

      return ResponseEntity.ok(meetingService.scheduleMeeting(meeting));
    }
    @PostMapping("/instant")
    public ResponseEntity<MeetingResponse>  instantMeeting(@RequestBody InstantMeetingRequest meeting)
    {
     return    ResponseEntity.ok(meetingService.startInstantMeeting(meeting));
    }

    @PostMapping("/participant")
    public ResponseEntity<Boolean>addParticipant(@RequestBody ParticipantRequest participantRequest)
    {
        return ResponseEntity.ok(meetingService.addParticipantToMeeting(participantRequest));
    }


    @DeleteMapping("/participant")
    public ResponseEntity<Boolean>removeParticipant(@RequestBody ParticipantRequest participantRequest)
    {
        return ResponseEntity.ok(meetingService.removeParticipantFromMeeting(participantRequest));
    }
}
