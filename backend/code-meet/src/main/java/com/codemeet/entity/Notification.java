package com.codemeet.entity;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(nullable = false)
    private String content;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    private User sender;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    private User receiver;
    
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Instant sentAt;
    
    public Notification() {
    }
    
    public int getId() {
        return id;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public User getSender() {
        return sender;
    }
    
    public void setSender(User sender) {
        this.sender = sender;
    }
    
    public User getReceiver() {
        return receiver;
    }
    
    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }
    
    public Instant getSentAt() {
        return sentAt;
    }
}
