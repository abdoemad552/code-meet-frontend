package com.codemeet.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "friendships")
public class Friendship {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    private User requester;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    private User requested;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FriendshipStatus status;
    
    public Friendship() {
    }
    
    public Integer getId() {
        return id;
    }
    
    public User getRequester() {
        return requester;
    }
    
    public void setRequester(User requester) {
        this.requester = requester;
    }
    
    public User getRequested() {
        return requested;
    }
    
    public void setRequested(User requested) {
        this.requested = requested;
    }
    
    public FriendshipStatus getStatus() {
        return status;
    }
    
    public void setStatus(FriendshipStatus status) {
        this.status = status;
    }
}
