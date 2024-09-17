package com.store.backend.repository;

import com.store.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {


    Optional<User> findOneByEmailAndPassword(String email,String password);
    public User findByEmail(String email);
}
