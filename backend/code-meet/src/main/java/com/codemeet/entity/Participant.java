package com.codemeet.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "participants")
public class Participant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @OneToOne
    @JoinColumn(nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    private Meeting meeting;
    
    public Integer getId() {
        return id;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public Meeting getMeeting() {
        return meeting;
    }
    
    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }
}
