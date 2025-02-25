package com.codemeet.service;

import com.codemeet.entity.Membership;
import com.codemeet.entity.MembershipStatus;
import com.codemeet.entity.Room;
import com.codemeet.entity.User;
import com.codemeet.repository.MembershipRepository;
import com.codemeet.utils.dto.MembershipInfoResponse;
import com.codemeet.utils.dto.MembershipRequest;
import com.codemeet.utils.dto.RoomInfoResponse;
import com.codemeet.utils.dto.UserInfoResponse;
import com.codemeet.utils.exception.DuplicateResourceException;
import com.codemeet.utils.exception.EntityNotFoundException;
import com.codemeet.utils.exception.IllegalActionException;
import com.codemeet.utils.exception.ResourceType;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MembershipService {
    
    private final MembershipRepository membershipRepository;
    private final UserService userService;
    private final RoomService roomService;
    
    public MembershipService(
        MembershipRepository membershipRepository,
        UserService userService,
        @Lazy RoomService roomService
    ) {
        this.membershipRepository = membershipRepository;
        this.userService = userService;
        this.roomService = roomService;
    }
    
    public Membership getMembershipEntity(int membershipId) {
        return membershipRepository.findById(membershipId)
            .orElseThrow(() -> new EntityNotFoundException(
                "Membership with id '%d' not found"
                    .formatted(membershipId)));
    }
    
    public Membership getMembershipEntity(int userId, int roomId) {
        userService.getUserEntityById(userId);
        roomService.getRoomEntityById(roomId);
        return membershipRepository.findByUserIdAndRoomId(userId, roomId)
            .orElseThrow(() -> new EntityNotFoundException(
                "User with id '%d' is not a member of room with id '%d'"
                    .formatted(userId, roomId)));
    }
    
    public List<Room> getAllRoomEntitiesOfUser(int userId) {
        userService.getUserEntityById(userId);
        return membershipRepository.findAllOfUser(userId).stream()
            .map(Membership::getRoom)
            .toList();
    }
    
    public List<User> getAllUserEntitiesOfRoom(int roomId) {
        roomService.getRoomEntityById(roomId);
        return membershipRepository.findAllOfRoom(roomId).stream()
            .map(Membership::getUser)
            .toList();
    }
    
    public Membership addMembershipEntity(Membership membership) {
        return membershipRepository.save(membership);
    }
    
    public List<RoomInfoResponse> getAllRoomsOfUser(int userId) {
        return getAllRoomEntitiesOfUser(userId).stream()
            .map(RoomInfoResponse::of)
            .toList();
    }
    
    public List<UserInfoResponse> getAllUsersOfRoom(int roomId) {
        return getAllUserEntitiesOfRoom(roomId).stream()
            .map(UserInfoResponse::of)
            .toList();
    }
    
    @Transactional
    public MembershipInfoResponse requestMembership(MembershipRequest joinRequest) {
        User user = userService.getUserEntityById(joinRequest.userId());
        Room room = roomService.getRoomEntityById(joinRequest.roomId());

        if (membershipRepository.existsByUserIdAndRoomId(user.getId(), room.getId())) {
            throw new DuplicateResourceException(
                "User with id '%d' already exists in room with id '%d'"
                    .formatted(user.getId(), room.getId()), ResourceType.MEMBERSHIP);
        }

        Membership membership = new Membership();
        membership.setUser(user);
        membership.setRoom(room);

        if (user.getId().equals(room.getCreator().getId())) {
            membership.setStatus(MembershipStatus.ADMIN);
        } else {
            membership.setStatus(MembershipStatus.PENDING);
            //TODO: Send notification to `admin`...
        }

        return MembershipInfoResponse.of(addMembershipEntity(membership));
    }
    
    @Transactional
    public boolean acceptMembership(int membershipId) {
        Membership membership = getMembershipEntity(membershipId);
        membership.setStatus(MembershipStatus.ACCEPTED);
        //TODO: Send notification to `membership.getUser()`...
        return true;
    }
    
    @Transactional
    public boolean cancelMembership(int membershipId) {
        Membership membership = getMembershipEntity(membershipId);

        if (membership.getStatus().equals(MembershipStatus.ADMIN)) {
            throw new IllegalActionException(
                "Admin can't be removed from the room");
        }

        membershipRepository.deleteById(membershipId);
        return true;
    }
}
