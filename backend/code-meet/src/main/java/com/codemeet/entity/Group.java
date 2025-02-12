package com.codemeet.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "groups")
public class Group {

    @Id
    private Integer id;
    private String name;
    @ManyToOne
    private User createdBy;
    private LocalDateTime createdAt;



}
