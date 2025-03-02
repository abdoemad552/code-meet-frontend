package com.codemeet.utils.dto;


public record FriendshipResponse
        (
                Integer friendshipId,
                String friendFirstName,
                String friendLastName,
                String friendUserName,
                byte[] friendProfilePicture
        ) {
}
