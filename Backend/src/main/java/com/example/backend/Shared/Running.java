package com.example.backend.Shared;

import com.example.backend.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Running implements CommandLineRunner {

    @PersistenceContext
    EntityManager em;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        User user=new User("hamada");
        em.persist(user);

    }
}
