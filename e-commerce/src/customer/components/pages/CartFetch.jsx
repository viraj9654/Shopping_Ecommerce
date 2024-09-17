import React from "react";
import { useState, useEffect } from "react";
import CartPage from "./CartPage";

const CartFetch = () => {
  const [cart, setCart] = useState([]);

 
  useEffect(() => {
    fetch(`http://localhost:8080/cart/get/${54}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCart(data);
        // console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const maxQuantity = 10;

  return (
    <>      
      {cart?.lineItems?.map((item) => (
        
        <CartPage
          key={item.id}
          id={item.id}
          initialQuantity={item.quantity}
          maxQuantity={maxQuantity}
        
        
        
        
        />

      
      ))}
        
        </>

      
   
  );
};

export default CartFetch;
