package com.codemeet.repository;

import com.codemeet.entity.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {

    @Query(
        """
        SELECT f
        FROM Friendship f
        WHERE (f.from.id = :fromId AND f.to.id = :toId)
        OR (f.from.id = :toId AND f.to.id = :fromId)
        """
    )
    Optional<Friendship> findByFromIdAndToId(Integer fromId, Integer toId);

    @Query(
        """
        SELECT f
        FROM Friendship f
        WHERE f.from.id = :userId OR f.to.id = :userId
        ORDER BY f.status
        """
    )
    List<Friendship> findAllByUserId(Integer userId);

    @Query(
        """
        SELECT f
        FROM Friendship f
        WHERE (f.from.id = :userId OR f.to.id = :userId)
        AND f.status = "ACCEPTED"
        """
    )
    List<Friendship> findAllAcceptedByUserId(Integer userId);

    // Finds all friendship requests `sent by` user whose id is `userId`
    @Query(
        """
        SELECT f
        FROM Friendship f
        WHERE f.from.id = :userId
        AND f.status = "PENDING"
        """
    )
    List<Friendship> findAllPendingSentByUserId(Integer userId);

    // Finds all friendship requests `sent to` user whose id is `userId`
    @Query(
        """
        SELECT f
        FROM Friendship f
        WHERE f.to.id = :userId
        AND f.status = "PENDING"
        """
    )
    List<Friendship> findAllPendingReceivedByUserId(Integer userId);

    boolean existsByFromIdAndToId(Integer fromId, Integer toId);
}
