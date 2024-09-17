package com.store.backend.services;


import com.store.backend.entity.Cart;
import com.store.backend.entity.Shipping;
import com.store.backend.repository.CartRepository;
import com.store.backend.repository.ShippingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShippingService {

    @Autowired
    ShippingRepository shippingRepository;

    @Autowired
    CartRepository cartRepository;


    public Shipping addAddress(Shipping shipping,int id ){
        Cart cart= cartRepository.findById(id).get();

        if(cart.getShipping() == null) {
            cart.setShipping(Shipping.builder().build());
        }

        Shipping existingShipping = cart.getShipping();

        existingShipping.setFirstName(shipping.getFirstName());
        existingShipping.setLastName(shipping.getLastName());
        existingShipping.setAddress(shipping.getAddress());
        existingShipping.setCity(shipping.getCity());
        existingShipping.setCart(cart);
        existingShipping.setPhoneNumber(shipping.getPhoneNumber());
        existingShipping.setZipCode(shipping.getZipCode());

        cart.setShipping(existingShipping);
        cartRepository.save(cart);
        return cart.getShipping();

    }


}
