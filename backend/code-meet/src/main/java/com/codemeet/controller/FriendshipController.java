package com.codemeet.controller;

import com.codemeet.service.FriendshipService;
import com.codemeet.utils.dto.FriendshipRequest;
import com.codemeet.utils.dto.FriendshipResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friendship")
public class FriendshipController {

    private final FriendshipService friendshipService;


    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    @PostMapping("/request")
    public ResponseEntity<Integer> askFriendshipRequest(@RequestBody FriendshipRequest friendshipRequest)
    {
     return    ResponseEntity.ok(friendshipService.askFriendshipRequest(friendshipRequest));
    }
//handles three cases
    @DeleteMapping("/cancel/{friendshipId}")
    public ResponseEntity<Boolean> cancelFriendship(@PathVariable Integer friendshipId)
    {
        return ResponseEntity.ok(friendshipService.cancelFriendship(friendshipId));
    }
    @PostMapping("/accept/{friendshipId}")
    public ResponseEntity<Boolean> acceptFriendshipRequest(@PathVariable  Integer friendshipId)
    {
        return ResponseEntity.ok(friendshipService.acceptFriendshipRequest(friendshipId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<FriendshipResponse>>getAllFriends(@PathVariable Integer userId)
    {

        return ResponseEntity.ok(friendshipService.getAllFriends(userId));
    }
    @GetMapping("/pending/{userId}")
    public ResponseEntity<List<FriendshipResponse>>getPendingFriendships(@PathVariable Integer userId)
    {
        return ResponseEntity.ok(friendshipService.getPendingFriendships(userId));
    }
}
