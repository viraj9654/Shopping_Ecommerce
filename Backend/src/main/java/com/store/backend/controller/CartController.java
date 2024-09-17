package com.store.backend.controller;


import com.store.backend.DTO.AddToCart;
import com.store.backend.DTO.CartStatus;
import com.store.backend.DTO.UpdateCart;
import com.store.backend.entity.Cart;
import com.store.backend.entity.LineItem;
import com.store.backend.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cart")

public class CartController {
    @Autowired
    CartService cartService;

    @GetMapping("/get/{cartId}")
    public Cart getCartById(@PathVariable(value = "cartId") int id) {
        return cartService.getCartById(id);
    }

    @GetMapping("/get")
    public List<Cart> getAllCart() {
        List<Cart> carts = cartService.getAllCart();
        return carts;
    }

//    @PostMapping("/add")
//    public Cart addCart(@RequestBody Cart cart) {
//        Cart cart1 = cartService.addCart(cart);
//        return cart1;
//    }


    @PostMapping("/addtocart")
    public Cart addProductToCart(@RequestBody AddToCart addToCart) {
        Cart cart = cartService.addProductToCart(addToCart);
        return cart;
    }

    @DeleteMapping("/delete/{cartId}/{id}")
    public Cart deleteById(@PathVariable(value = "id") int id, @PathVariable(value = "cartId") int cartId) {
        return cartService.deleteLineitem(cartId, id);

    }

    @GetMapping("/subtotal/{id}")
    public double subtotal(@PathVariable(value = "id") int id) {
        return cartService.subtotal(id);
    }

    @PostMapping("/update/{id}")
    public Cart updateQuantity(@PathVariable(value = "id") int cartId, @RequestBody UpdateCart updateCart) {

        return cartService.updateQuantity(cartId, updateCart);

    }

    @GetMapping("/count/{cartId}")

    public long countItem(@PathVariable(value = "cartId") int id) {
        return  cartService.countItem(id);
    }


    @PostMapping("/updateStatus/{cartId}")
    public Cart updateStatus(@PathVariable (value = "cartId")int id ){
        return  cartService.updateStatus(id);
    }



   @GetMapping("/cart1/{userId}")
   public  Cart findByUseId(@PathVariable(value = "userId") Integer userId ){
        return cartService.findByUserId(userId);
   }

   @GetMapping("/cart1/{userId}/sta")
    public Cart findByUserIdWithStatus(@PathVariable(value = "userId")Integer userId, CartStatus cartStatus){
         return  cartService.findByUserIdWithStatus(userId, cartStatus=CartStatus.PENDING);
   }



}