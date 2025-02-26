package com.codemeet.service;

import com.codemeet.entity.Participant;
import com.codemeet.repository.ParticipantRepository;
import com.codemeet.utils.dto.ParticipantRequest;
import com.codemeet.utils.exception.DuplicateResourceException;
import com.codemeet.utils.exception.EntityNotFoundException;
import com.codemeet.utils.exception.ResourceType;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class ParticipantService {
    private final ParticipantRepository participantRepository;


    public ParticipantService(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;

    }

    public Boolean addParticipants(Set<Participant> participants)
    {
        participantRepository.saveAll(participants);
        return true;
    }
    @Transactional
    public void addParticipant(Participant participant)
    {
        //todo:possible to check cache before hitting DB


      participantRepository.save(participant);
    }
    @Transactional
    public void removeParticipant(ParticipantRequest participant)
    {
        //todo:possible to check cache before hitting DB
        Boolean participantExist= participantRepository.checkParticipantExistence(participant.participantId(), participant.meetingId());
               if(!participantExist)
                {
                    throw new EntityNotFoundException("participant with userId= "+participant.participantId()
                            +" and meetingId "+participant.meetingId()+ " doesn't exist to remove");
                }
        participantRepository.removeParticipant(participant.participantId(), participant.meetingId());
    }
}
