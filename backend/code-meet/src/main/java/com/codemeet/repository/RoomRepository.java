package com.codemeet.repository;

import com.codemeet.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    boolean existsById(Integer id);


    @Query("""
            select r from Room r where r.creator.id=:userId
            """)
    List<Room> getAllByCreatorId(Integer userId);
}
