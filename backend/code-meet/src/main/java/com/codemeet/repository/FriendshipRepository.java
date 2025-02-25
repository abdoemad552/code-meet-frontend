package com.codemeet.repository;



import com.codemeet.entity.Friendship;
import com.codemeet.utils.dto.FriendshipRequest;
import com.codemeet.utils.dto.FriendshipResponse;
import org.apache.el.stream.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {


   @Query("""
           select new com.codemeet.utils.dto.FriendshipResponse(f.id,f.to.username,f.to.profilePicture)
            from Friendship f where (f.from.id=:userId OR f.to.id=:userId) AND f.status=FriendshipStatus.ACCEPTED
           """)
 List<FriendshipResponse> getAllFriends(Integer userId);


    @Query("""
           select new com.codemeet.utils.dto.FriendshipResponse(f.id,f.to.username,f.to.profilePicture)
            from Friendship f where f.to.id=:userId AND f.status=FriendshipStatus.PENDING
           """)
    List<FriendshipResponse> getPendingFriendships(Integer userId);

    @Query("""
    select not exists(
        select f from Friendship f 
        where (f.from.id = :#{#friendshipRequest.responserId} 
        and f.to.id = :#{#friendshipRequest.requesterId}) 
        or (f.from.id = :#{#friendshipRequest.requesterId} 
        and f.to.id = :#{#friendshipRequest.responserId})
    )
""")
    Boolean checkUniqueFriendship(FriendshipRequest friendshipRequest);


}
