package com.codemeet.repository;

import com.codemeet.entity.Room;
import com.codemeet.utils.dto.RoomDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoomRepository extends JpaRepository<Room, Integer> {


}
