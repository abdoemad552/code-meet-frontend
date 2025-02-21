package com.codemeet.service;

import com.codemeet.entity.Room;
import com.codemeet.entity.User;
import com.codemeet.repository.RoomRepository;
import com.codemeet.utils.dto.RoomDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserService userService;
    
    public RoomService(RoomRepository roomRepository, UserService userService) {
        this.roomRepository=roomRepository;
        this.userService=userService;
    }

    @Transactional
    public RoomDTO addRoom(RoomDTO room){
        Room roomEntity = new Room();
        User creator = userService.getUserEntityById(room.creatorId());

        roomEntity.setName(room.name());
        roomEntity.setCreator(creator);

        roomRepository.save(roomEntity);

        return new RoomDTO(roomEntity.getId(),room.creatorId(),room.name());
    }


}
