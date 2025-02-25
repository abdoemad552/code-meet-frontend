package com.codemeet.controller;

import com.codemeet.service.RoomService;
import com.codemeet.utils.dto.RoomCreationRequest;
import com.codemeet.utils.dto.RoomInfoResponse;
import com.codemeet.utils.dto.RoomUpdateRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room")
public class RoomController {
    
    private final RoomService roomService;
    
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }
    
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomInfoResponse> getRoomById(@PathVariable int roomId) {
        return ResponseEntity.ok(roomService.getRoomById(roomId));
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<RoomInfoResponse>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }
    
    @PostMapping("/create")
    public ResponseEntity<RoomInfoResponse> createRoom(
        @RequestBody RoomCreationRequest creationRequest
    ) {
        return ResponseEntity.ok(roomService.createRoom(creationRequest));
    }
    
    @PutMapping("/update")
    public ResponseEntity<RoomInfoResponse> updateRoom(
        @RequestBody RoomUpdateRequest updateRequest
    ) {
        return ResponseEntity.ok(roomService.updateRoom(updateRequest));
    }
}
