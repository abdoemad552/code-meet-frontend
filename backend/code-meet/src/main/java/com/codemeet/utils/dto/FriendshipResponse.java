package com.codemeet.utils.dto;


public record FriendshipResponse
        (
                Integer friendshipId,
                String friendUserName,
                byte[] friendProfilePicture
        ) {
}
