package com.codemeet.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false, length = 50)
    private String name;
    
    @Column(nullable = false)
    private String description;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    private User creator;
    
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Instant createdAt;
    
    @Lob
    private byte[] roomPicture;

    public Room(String name,String description,User creator,byte[] roomPicture) {
        this.name=name;
        this.description=description;
        this.creator=creator;
        this.roomPicture=roomPicture;
    }
    public Room()
    {

    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
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
    
    public byte[] getRoomPicture() {
        return roomPicture;
    }
    
    public void setRoomPicture(byte[] roomPicture) {
        this.roomPicture = roomPicture;
    }
}
