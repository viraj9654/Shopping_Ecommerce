package com.store.backend.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Shipping {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String phoneNumber;
    private String zipCode;

    @OneToOne
    @JoinColumn(name = "cart_cartId")
    @JsonIgnore
    private Cart cart;


}
