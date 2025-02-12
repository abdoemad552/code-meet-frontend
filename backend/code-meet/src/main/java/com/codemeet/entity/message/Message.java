package com.codemeet.entity.message;

import com.codemeet.entity.user.User;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "messages")
public abstract class Message {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;
    
    @Column(nullable = false)
    protected String content;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    protected User sender;
    
    @Column(nullable = false, updatable = false)
    protected Instant sentAt;
    
    public Message() {
        this.sentAt = Instant.now();
    }
    
    public Integer getId() {
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
    
    public Instant getSentAt() {
        return sentAt;
    }
}
