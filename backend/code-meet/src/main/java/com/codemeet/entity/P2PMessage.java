package com.codemeet.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "p2p_messages")
public final class P2PMessage extends Message {
    
    @ManyToOne
    @JoinColumn(nullable = false)
    private User receiver;
    
    public P2PMessage() {
    }
    
    public User getReceiver() {
        return receiver;
    }
    
    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }
}
