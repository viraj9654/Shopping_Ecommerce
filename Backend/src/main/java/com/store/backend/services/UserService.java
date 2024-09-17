package com.store.backend.services;

import com.store.backend.DTO.LoginDto;
import com.store.backend.DTO.UserDto;
import com.store.backend.entity.User;
import com.store.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;



 public List<User> getUser(){
     List<User> users=userRepository.findAll();
     return users;
 }

    public User addUser(UserDto userDto){
     User user=new User(
             userDto.getId(),
             userDto.getName(),
             userDto.getEmail(),
             userDto.getPassword(),
             userDto.getCpassword()

     );

      User user1=userRepository.save(user);
      return user1;

    }

    public List<User> getAllUser(){
    List<User> users=userRepository.findAll();
    return  users;
    }

public User loginUser(LoginDto loginDto){

    return userRepository.findOneByEmailAndPassword(loginDto.getEmail(), loginDto.getPassword()).orElse(null);
 }

        public  User findEmail(String email){
         User user=userRepository.findByEmail(email);
         return user;
        }

        public String deleteAll(){
         userRepository.deleteAll();
         return "deleted";
        }

        public ResponseEntity<String> logoutUser(){

     return ResponseEntity.status(200).body("Logged Out Successfully");
        }


    public org.springframework.security.core.userdetails.User loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);


        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                new ArrayList<>());
    }

    public User findUserByUsername(String username) {
     return  userRepository.findByEmail(username);
    }


}



