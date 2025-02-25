package com.codemeet.service;

import com.codemeet.entity.Friendship;
import com.codemeet.entity.FriendshipStatus;
import com.codemeet.entity.User;
import com.codemeet.repository.FriendshipRepository;
import com.codemeet.utils.dto.FriendshipRequest;
import com.codemeet.utils.dto.FriendshipResponse;
import com.codemeet.utils.exception.DuplicateResourceException;
import com.codemeet.utils.exception.EntityNotFoundException;
import com.codemeet.utils.exception.ResourceType;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendshipService {
    private final FriendshipRepository friendshipRepository;
    private final UserService userService;
    public FriendshipService(FriendshipRepository friendshipRepository,UserService userService)
    {
        this.friendshipRepository=friendshipRepository;
        this.userService=userService;
    }

    @Transactional
    public Integer askFriendshipRequest(FriendshipRequest friendshipRequest)
    {

        User from= userService.getUserEntityById(friendshipRequest.requesterId());
        User to= userService.getUserEntityById(friendshipRequest.responserId());

        if (!friendshipRepository.checkUniqueFriendship(friendshipRequest)) {
            throw new DuplicateResourceException(
                    "Friendship between userId=" + friendshipRequest.requesterId() +
                            " and userId=" + friendshipRequest.responserId() +
                            " already exists",
                    ResourceType.FRIENDSHIP
            );
        }

        Friendship friendship=new Friendship(from,to, FriendshipStatus.PENDING);
        friendshipRepository.save(friendship);
        //todo: send notification with FriendshipResponse to requested user to that this user wants to be his friend

        return friendship.getId();
    }



    @Transactional
    public Boolean cancelFriendship(Integer friendshipId)
    {
     Friendship friendship=friendshipRepository.findById(friendshipId)
             .orElseThrow(()->new EntityNotFoundException("friendship with id " +friendshipId +" doesn't exist"));

     friendshipRepository.delete(friendship);
     return true;
    }
    @Transactional
    public Boolean acceptFriendshipRequest(Integer friendshipId)
    {
        Friendship friendship=friendshipRepository.findById(friendshipId)
                .orElseThrow(()->new EntityNotFoundException("friendship with id " +friendshipId +" doesn't exist"));

        friendship.setStatus(FriendshipStatus.ACCEPTED);
        friendshipRepository.save(friendship);

        return true;
    }

    public List<FriendshipResponse> getAllFriends(Integer userId)
    {
      return  friendshipRepository.getAllFriends(userId);
    }
    public List<FriendshipResponse>getPendingFriendships(Integer userId)
    {
        return friendshipRepository.getPendingFriendships(userId);
    }

}
