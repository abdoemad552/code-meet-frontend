package com.codemeet.controller;


import com.codemeet.service.RoomService;
import com.codemeet.utils.dto.RoomDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("api/room")
public class RoomController {


    private final RoomService roomService;
    public RoomController(RoomService roomService)
    {
        this.roomService=roomService;
    }
    @PostMapping
    public ResponseEntity<RoomDTO> addRoom(@RequestBody RoomDTO room)
    {
        return ResponseEntity.ok(roomService.addRoom(room));
    }
}
