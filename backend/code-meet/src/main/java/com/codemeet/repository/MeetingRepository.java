package com.codemeet.repository;

import com.codemeet.entity.Meeting;
import com.codemeet.utils.dto.MeetingResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface MeetingRepository extends JpaRepository<Meeting, Integer> {


    @Query("""
    select new com.codemeet.utils.dto.MeetingResponse(m.id, m.title, m.startsAt) 
    from Meeting m
    join Participant p on p.meeting = m
    where p.user.id = :userId 
    and m.status = MeetingStatus.FINISHED order by startsAt desc
""")
    List<MeetingResponse> getPreviousMeetings(Integer userId);

    @Query("""
    select new com.codemeet.utils.dto.MeetingResponse(m.id, m.title, m.startsAt) 
    from Meeting m
    join Participant p on p.meeting = m
    where p.user.id = :userId 
    and m.status = MeetingStatus.SCHEDULED order by startsAt desc
""")
    List<MeetingResponse> getScheduledMeetings(Integer userId);

}
