package com.codemeet.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "room_messages")
public final class RoomMessage extends Message {
    
    @ManyToOne
    @JoinColumn(nullable = false)
    private Room room;
    
    public RoomMessage() {
    }
    
    public Room getRoom() {
        return room;
    }
    
    public void setRoom(Room room) {
        this.room = room;
    }
}
