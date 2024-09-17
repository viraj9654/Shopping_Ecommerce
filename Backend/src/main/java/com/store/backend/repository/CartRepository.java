package com.store.backend.repository;

import com.store.backend.DTO.CartStatus;
import com.store.backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CartRepository extends JpaRepository<Cart,Integer> {

 public   Cart findByUserId(Integer userId);
 public Cart findByUserIdAndCartStatus(Integer userId,CartStatus cartStatus);

}
