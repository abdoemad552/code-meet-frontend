package com.codemeet.controller;

import com.codemeet.service.MembershipService;
import com.codemeet.utils.dto.MembershipInfoResponse;
import com.codemeet.utils.dto.MembershipRequest;
import com.codemeet.utils.dto.RoomInfoResponse;
import com.codemeet.utils.dto.UserInfoResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/membership")
public class MembershipController {
    
    private final MembershipService membershipService;
    
    public MembershipController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }
    
    @GetMapping("/room/{roomId}/user/all")
    public ResponseEntity<List<UserInfoResponse>> getAllUsersOfRoom(
        @PathVariable int roomId
    ) {
        return ResponseEntity.ok(membershipService.getAllUsersOfRoom(roomId));
    }
    
    @GetMapping("/user/{userId}/room/all")
    public ResponseEntity<List<RoomInfoResponse>> getAllRoomsOfUser(
        @PathVariable int userId
    ) {
        return ResponseEntity.ok(membershipService.getAllRoomsOfUser(userId));
    }
    
    @PostMapping("/request")
    public ResponseEntity<MembershipInfoResponse> requestMembership(
        @RequestBody MembershipRequest membershipRequest
    ) {
        return ResponseEntity.ok(membershipService.requestMembership(membershipRequest));
    }
    
    @PatchMapping("/accept/{membershipId}")
    public ResponseEntity<Boolean> acceptMembership(@PathVariable int membershipId) {
        return ResponseEntity.ok(membershipService.acceptMembership(membershipId));
    }
    
    @DeleteMapping("/cancel/{membershipId}")
    public ResponseEntity<Boolean> cancelMembership(@PathVariable int membershipId) {
        return ResponseEntity.ok(membershipService.cancelMembership(membershipId));
    }
}
