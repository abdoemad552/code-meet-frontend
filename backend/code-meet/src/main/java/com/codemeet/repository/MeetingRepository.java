package com.codemeet.repository;

import com.codemeet.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface MeetingRepository extends JpaRepository<Meeting, Integer> {



}
