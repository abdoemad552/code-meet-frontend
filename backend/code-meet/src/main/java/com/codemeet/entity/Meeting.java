package com.codemeet.entity;

import com.codemeet.entity.user.User;
import jakarta.persistence.*;

import java.time.Instant;

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
    
    @Column(nullable = false, updatable = false)
    private Instant createdAt;
    
    public Meeting() {
        this.createdAt = Instant.now();
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
    
    public Instant getCreatedAt() {
        return createdAt;
    }
}
