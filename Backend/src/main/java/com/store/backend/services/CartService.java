package com.store.backend.services;

import com.store.backend.DTO.AddToCart;
import com.store.backend.DTO.CartStatus;
import com.store.backend.DTO.UpdateCart;
import com.store.backend.entity.Cart;
import com.store.backend.entity.LineItem;
import com.store.backend.entity.Product;
import com.store.backend.entity.Shipping;
import com.store.backend.repository.CartRepository;
import com.store.backend.repository.LineItemRepository;
import com.store.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    LineItemRepository lineItemRepository;

    @Autowired
    ProductRepository productRepository;


    public Cart getCartById(Integer id){
        if(id != null) {
            Cart cart = cartRepository.findById(id).get();
            cart.setSubtotal(this.subtotal(cart));
            return  cart;
        } else {
            return createEmptyCart();
        }
    }

    private Cart createEmptyCart() {
        Cart emptyCart = Cart.builder()
                .lineItems(new ArrayList<>())
                .cartStatus(CartStatus.PENDING)
                .shipping(Shipping.builder().build())
                .build();
        cartRepository.save(emptyCart);
        return emptyCart;
    }

    public Cart getCartByUserId(Integer userId) {
        // get cart from cart repo by user id and status
       Cart cart=cartRepository.findByUserIdAndCartStatus(userId,CartStatus.PENDING);
//
        if(cart == null) {
            cart = createEmptyCart();
            cart.setUserId(userId);
            cartRepository.save(cart);
        }
        return cart;
    }

    public List<Cart> getAllCart(){
       List<Cart> cart=cartRepository.findAll();
       return cart;
    }

    public Cart addProductToCart(AddToCart addToCart) {


       Cart cart = getCartById(addToCart.getCartId());

       Optional<Product>  optionalProduct= productRepository.findById(addToCart.getProductId());
        if( optionalProduct.isPresent()) {
            Optional<LineItem> lineItemOptional = cart.getLineItems().stream()
                    .filter(item -> item.getPid() == addToCart.getProductId() && item.getSize().equalsIgnoreCase(addToCart.getSize()))
                    .findFirst();

            if(lineItemOptional.isPresent()) {
                LineItem lineItem = lineItemOptional.get();
                lineItem.setQuantity(lineItem.getQuantity() + addToCart.getQty());
                lineItemRepository.save(lineItem);
            } else {
                Product product = optionalProduct.get() ;
                LineItem lineItem = LineItem.builder()
                        .cart(cart)
                        .productImage(product.getImageUrl())
                        .pid( addToCart.getProductId())
                        .pname(product.getTitle())
                        .pprice(product.getPrice())
                        .size(addToCart.getSize())
                        .quantity(addToCart.getQty())
                        .build();

                cart.getLineItems().add(lineItem);
                cartRepository.save(cart);
            }
        }
        return getCartById(cart.getCartId());
    }

    public double subtotal(int id){
        Cart cart=cartRepository.findById(id).get();
        return subtotal(cart);

    }

    public double subtotal(Cart cart){
        List<LineItem> lineItem=cart.getLineItems();
        double subtotal = lineItem.stream()
                .mapToDouble(lineItem1 -> lineItem1.getPprice() * lineItem1.getQuantity())
                .sum();
        return subtotal;
    }

    public Cart deleteLineitem(int cartId, int id){
        lineItemRepository.deleteById(id);
        return getCartById(cartId);
    }

    public Cart updateQuantity(int cartId, UpdateCart updateCart){
        Cart cart=cartRepository.findById(cartId).get();
        Optional<LineItem> lineItems=cart.getLineItems()
    .stream().filter(lineItem -> lineItem.getId()==updateCart.getLineId()).findFirst();

        if(lineItems.isPresent()) {
            LineItem lineItem = lineItems.get();
            lineItem.setQuantity(updateCart.getQuantity());
            cartRepository.save(cart);
        }
      return getCartById(cart.getCartId());
    }
    public long countItem(int cartId){
           return cartRepository.
                   findById(cartId)
                   .get()
                   .getLineItems()
                   .size();

    }

    public Cart updateStatus(int id ){
        Cart cart = getCartById(id);
        cart.setCartStatus(CartStatus.SUBMITTED);
        cartRepository.save(cart);
        return cart;
    }


    public Cart findByUserId(Integer userId){
        return cartRepository.findByUserId(userId);

    }

    public Cart findByUserIdWithStatus(Integer userId,CartStatus cartStatus){
        return cartRepository.findByUserIdAndCartStatus(userId,cartStatus);
    }

}
