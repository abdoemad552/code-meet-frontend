package com.example.backend.model;

import jakarta.persistence.*;
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;


    public User(String name)
    {

        this.name=name;
    }
}
