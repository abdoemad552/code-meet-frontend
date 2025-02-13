package com.codemeet.entity;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "memberships")
public class Membership {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private User user;
    
    @ManyToOne
    private Room room;
    
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Instant joinedAt;
    
    public Membership() {
    }
    
    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
    public Room getRoom() {
        return room;
    }
    
    public void setRoom(Room room) {
        this.room = room;
    }
    
    public Instant getJoinedAt() {
        return joinedAt;
    }
}
