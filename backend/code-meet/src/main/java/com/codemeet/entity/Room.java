package com.codemeet.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false)
    private String name;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    private User creator;
    
    @Column(nullable = false, updatable = false)
    @ColumnDefault("NOW()")
    private Instant createdAt;
    
    public Room() {
    }
    
    public Integer getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
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
