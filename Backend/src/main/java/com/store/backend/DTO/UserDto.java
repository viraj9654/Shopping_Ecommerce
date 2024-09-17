package com.store.backend.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDto {
    private int id ;

    private String name;

    private  String email;

    private String password;

    private String cpassword;
}
