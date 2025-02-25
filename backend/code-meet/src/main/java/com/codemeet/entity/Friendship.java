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
    private User from;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    private User to;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FriendshipStatus status;
    
    public Friendship() {
    }
    
    public Integer getId() {
        return id;
    }
    
    public User getFrom() {
        return from;
    }
    
    public void setFrom(User from) {
        this.from = from;
    }

    public User getTo() {
        return to;
    }

    public void setTo(User to) {
        this.to = to;
    }

    public FriendshipStatus getStatus() {
        return status;
    }
    
    public void setStatus(FriendshipStatus status) {
        this.status = status;
    }
}
