package com.codemeet.repository;

import com.codemeet.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface ParticipantRepository extends JpaRepository<Participant, Integer> {

        @Modifying
        @Query("""
        delete from Participant p 
        where p.user.id = :participantId and p.meeting.id = :meetingId
    """)
        void removeParticipant(@Param("participantId") Integer participantId, @Param("meetingId") Integer meetingId);


@Query("""
        select exists(
        select p from Participant p 
         where p.user.id = :participantId and p.meeting.id = :meetingId
        )""")
    Boolean checkParticipantExistence(@Param("participantId") Integer participantId, @Param("meetingId") Integer meetingId);


}



