package com.codemeet.entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "meetings")
public class Meeting {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false, length = 50)
    private String title;
    
    private String description;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    private User creator;
    
    @Column(nullable = false)
    private Instant startsAt;
    
    @Column(nullable = false)
    private MeetingState state;
    
    public Meeting() {
    }
    
    public Integer getId() {
        return id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public User getCreator() {
        return creator;
    }
    
    public void setCreator(User creator) {
        this.creator = creator;
    }
    
    public Instant getStartsAt() {
        return startsAt;
    }
    
    public void setStartsAt(Instant startsAt) {
        this.startsAt = startsAt;
    }
    
    public MeetingState getState() {
        return state;
    }
    
    public void setState(MeetingState state) {
        this.state = state;
    }
}
