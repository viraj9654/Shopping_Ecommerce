package com.store.backend.controller;


import com.store.backend.DTO.AuthenticationResponse;
import com.store.backend.DTO.LoginDto;
import com.store.backend.DTO.UserDto;
import com.store.backend.config.JwtTokenProvider;
import com.store.backend.config.JwtUtil;
import com.store.backend.entity.Cart;
import com.store.backend.entity.User;
import com.store.backend.services.CartService;
import com.store.backend.services.TokenBlacklistService;
import com.store.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    CartService cartService;

    @Autowired
    private TokenBlacklistService tokenBlacklistService;



    @PostMapping("/register")
    public ResponseEntity<User> addUser(@RequestBody UserDto userDto){
       User user1= userService.addUser(userDto);
        return new ResponseEntity<>(user1, HttpStatus.CREATED);

    }

    @GetMapping("/all")
    public List<User> getAllUser(){
    List<User> users= userService.getAllUser();
    return users;

    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto ) {

        User user =userService.loginUser(loginDto);
        if (user != null) {
            final org.springframework.security.core.userdetails.User userDetails = userService.loadUserByUsername(loginDto.getEmail());
            final String jwt = jwtTokenProvider.generateToken(userDetails);
            final Cart cart = cartService.getCartByUserId(user.getId());
            return ResponseEntity.ok(AuthenticationResponse.builder()
                    .jwt(jwt)
                    .cartId(String.valueOf(cart.getCartId()))
                    .build());
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }


    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam String token) {
        tokenBlacklistService.blacklistToken(token);
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/email/get")
    public User findEmail(@RequestParam  String email){
        User user=userService.findEmail(email);
        return user;

    }

    @DeleteMapping("/delete")
    public String deleteAll(){
        return userService.deleteAll();
    }
    @GetMapping("/by/username")
    public User findByUserName(@RequestParam String username){
        return userService.findUserByUsername(username);
    }



    }




