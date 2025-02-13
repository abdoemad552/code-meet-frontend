package com.codemeet.service;

import com.codemeet.entity.Room;
import com.codemeet.entity.User;
import com.codemeet.repository.NotificationRepository;
import com.codemeet.repository.RoomRepository;
import com.codemeet.repository.UserRepository;
import com.codemeet.utils.dto.RoomDTO;
import com.codemeet.utils.dto.UserDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    public RoomService(RoomRepository roomRepository, UserRepository userRepository)
    {
        this.roomRepository=roomRepository;
        this.userRepository=userRepository;
    }
    @Transactional
    public RoomDTO addRoom(RoomDTO room){


        Room roomEntity=new Room();
        User creator=userRepository.findById(room.creatorId()).orElseThrow();
        roomEntity.setName(room.name());
        roomEntity.setCreator(creator);

        roomRepository.save(roomEntity);

        return new RoomDTO(roomEntity.getId(),room.creatorId(),room.name());
    }


}
