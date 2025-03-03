package com.codemeet.service;

import com.codemeet.entity.Participant;
import com.codemeet.repository.ParticipantRepository;
import com.codemeet.utils.dto.ParticipantInfoResponse;
import com.codemeet.utils.dto.ParticipantRequest;
import com.codemeet.utils.exception.EntityNotFoundException;
import com.codemeet.utils.exception.IllegalActionException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantService {

    private final ParticipantRepository participantRepository;

    public ParticipantService(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

//    public boolean existsByUsernameAndMeetingId(String username, Integer meetingId) {
//        return participantRepository.existsByUsernameAndMeetingId(username, meetingId);
//    }
//
//    public Participant getParticipantEntityById(Integer participantId) {
//        return participantRepository.findById(participantId)
//            .orElseThrow(() -> new EntityNotFoundException(
//                "Participant with id '%d' not found".formatted(participantId)));
//    }
//
//    public Participant getParticipantEntityByUsernameAndMeetingId(
//        String username, Integer meetingId
//    ) {
//        return participantRepository.findByUsernameAndMeetingId(username, meetingId)
//            .orElseThrow(() -> new EntityNotFoundException(
//                "Participant with username '%s' and meetingId '%d' not found"
//                    .formatted(username, meetingId)));
//    }

//    public List<Participant> getAllParticipantEntitiesByMeetingId(Integer meetingId) {
//        //TODO: Check if the meeting exists...
//        return participantRepository.findByMeetingId(meetingId);
//    }

//    public ParticipantInfoResponse getParticipantById(Integer participantId) {
//        return ParticipantInfoResponse.of(getParticipantEntityById(participantId));
//    }
//
//    public ParticipantInfoResponse getParticipantByUsernameAndMeetingId(
//        String username, Integer meetingId
//    ) {
//        return ParticipantInfoResponse.of(getParticipantEntityByUsernameAndMeetingId(username, meetingId));
//    }
//
//    public List<ParticipantInfoResponse> getAllParticipantsByMeetingId(Integer meetingId) {
//        return getAllParticipantEntitiesByMeetingId(meetingId).stream()
//            .map(ParticipantInfoResponse::of)
//            .toList();
//    }
//
//    public Participant addParticipantEntity(Participant participant) {
//        return participantRepository.save(participant);
//    }
//
//    @Transactional
//    public List<Participant> addAllParticipantEntities(List<Participant> participants) {
//        return participantRepository.saveAll(participants);
//    }
//
//    @Transactional
//    public void removeParticipant(ParticipantRequest participantRequest) {
//        //TODO: Possible to check cache before hitting DB
//        Participant participant = getParticipantEntityByUsernameAndMeetingId(
//            participantRequest.username(), participantRequest.meetingId()
//        );
//
//        if (isMeetingCreator(participant)) {
//            throw new IllegalActionException(
//                "Meeting creator can't be removed from the meeting");
//        }
//
//        participantRepository.delete(participant);
//    }
//
//    @Transactional
//    public void removeParticipant() {
//        Participant participant = getParticipantEntityById(participantId);
//
//        if (isMeetingCreator(participant)) {
//            throw new IllegalActionException(
//                "Meeting creator can't be removed from the meeting");
//        }
//
//        participantRepository.delete(participant);
//    }
}
