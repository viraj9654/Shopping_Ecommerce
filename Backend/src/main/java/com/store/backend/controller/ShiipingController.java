package com.store.backend.controller;


import com.store.backend.entity.Shipping;
import com.store.backend.services.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shipping")
public class ShiipingController {

    @Autowired
    ShippingService shippingService;


    @PostMapping("/add/{cartId}")
    public Shipping addAddress(@PathVariable (value = "cartId")int id ,@RequestBody Shipping shipping){
        Shipping shipping1=shippingService.addAddress(shipping,id);
        return  shipping;
    }




}
