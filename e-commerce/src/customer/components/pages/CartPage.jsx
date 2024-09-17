import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import Footer from "./Footer";
const CartPage = () => {
  const token = localStorage.getItem('Token')
  const cartId=localStorage.getItem('cartId')
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("pid");

  const [cartItem, setcartItem] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/cart/get/${cartId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setcartItem(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  let navigate = useNavigate();
  const routeChange = () => {
    navigate(`/Checkout`);
  };
  const handleRemoveItem = async (id) => {
    if (id) {
      try {
        await fetch(`http://localhost:8080/cart/delete/54/${id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            setcartItem(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };
  const [quantity, setQuantity] = useState(1);

  const handleUpdateCart = async (id, qty) => {
    const cartItem1 = {
      lineId: id,
      quantity: qty,
    };
    fetch(`http://localhost:8080/cart/update/${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      
          'Authorization': `Bearer ${token}`
        
      },
      body: JSON.stringify(cartItem1),
       credentials: "include" 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setcartItem(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  let maxQuantity = 30;
  const handleIncrease = (id, quantity) => {
    if (quantity < maxQuantity) {
      let qty = quantity + 1;
      setQuantity(qty);
      handleUpdateCart(id, qty);
      console.log(qty);
    }
  };
  const handleDecrease = (id, quantity) => {
    console.log(quantity);
    if (quantity > 1) {
      let qty = quantity - 1;
      setQuantity(qty);
      handleUpdateCart(id, qty);
      console.log(qty);
    }
  };

 

  const handleEmpty = () => {
    navigate(`/`);
  };

  return (
    <>
      <div>
        <Navigation />
        {cartItem?.lineItems?.length === 0 ? (
          <div class="max-w-4xl mx-auto px-10 py-4 bg-white rounded-lg shadow-lg">
            <div class="flex flex-col items-center justify-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-24 w-24 text-gray-400 mb-4"
              >
                <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
              </svg>
              <p class="text-gray-600 text-lg font-semibold mb-4">
                Your shopping cart is empty.
              </p>
              <button class="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300" onClick={handleEmpty}>
                Let's go shopping!
              </button>
            </div>
          </div>
        ) : (
          <div class="h-screen  pt-20 bg-slate-50">
            <h1 class="mb-10 text-center text-2xl font-bold">Shopping Cart</h1>
            <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div class="rounded-lg md:w-2/3">
                {cartItem?.lineItems?.map((item) => (
                  <div class="justify-between mb-2  rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img
                      src={item.productImage}
                      alt="product-image"
                      class="w-full rounded-lg sm:w-40 "
                    />
                    <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div class="mt-5 sm:mt-0">
                        <h2 class="text-lg font-bold text-gray-900">
                          {item.pname}
                        </h2>
                        <p class="mt-1 text-xs text-gray-700">
                          size:{item.size}
                        </p>
                        <p class="mt-1 text-xs text-gray-700">
                          quantity:{item.quantity}
                        </p>
                        {/* <button onClick={()=>handleUpdateCart(item.id,item.quantity)}>default</button> */}
                      </div>
                      <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div class="flex items-center border-gray-100">
                          <button
                            class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() =>
                              handleDecrease(item.id, item.quantity)
                            }
                            disabled={quantity < 1}
                          >
                            {" "}
                            -{" "}
                          </button>
                          <input
                            class="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={item.quantity}
                            min="1"
                            readOnly
                            max={maxQuantity}
                          />
                          <button
                            class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() =>
                              handleIncrease(item.id, item.quantity)
                            }
                            disabled={quantity >= maxQuantity}
                          >
                            {" "}
                            +{" "}
                          </button>
                        </div>
                        <div class="flex items-center space-x-4">
                          <p class="text-sm">Rs.{item.pprice}</p>
                        </div>
                        <button
                          type="button"
                          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Delete
                        </button>
                        {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div class="mb-2 flex justify-between">
                  <p class="text-gray-700">Subtotal </p>

                  <p class="text-gray-700">Rs.{cartItem.subtotal}</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-gray-700">Shipping</p>
                  <p class="text-gray-700">free delivery</p>
                </div>
                <hr class="my-4" />
                <div class="flex justify-between">
                  <p class="text-lg font-bold">Total</p>
                  <div class="">
                    <p class="mb-1 text-lg font-bold">Rs.{cartItem.subtotal}</p>
                    <p class="text-sm text-gray-700">including VAT</p>
                  </div>
                </div>
                <button
                  class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                  onClick={routeChange}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </>
  );
};

export default CartPage;
