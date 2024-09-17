import React from "react";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import Footer from "./Footer";
const Order = () => {
  const token = localStorage.getItem('Token')
  const cartId=localStorage.getItem('cartId')
  const [cartItem, setcartItem] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/cart/get/${cartId}`, {
      credentials: "include",
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
  }, []);
  let navigate = useNavigate();
  const routeChange=() => {
  navigate("/")
  }
  

  return (
    <>
      <section class="py-24 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 class="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-11">
            Your Order Confirmed
          </h2>
          <h6 class="font-medium text-xl leading-8 text-black mb-3">
            Hello, {cartItem?.shipping?.firstName}{" "}
            {cartItem?.shipping?.lastName}
          </h6>
          <p class="font-normal text-lg leading-8 text-gray-500 mb-11">
            Your order has been completed and be delivery in only two days .
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-6 border-y border-gray-100 mb-6">
            <div class="box group">
              <p class="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                Delivery Date
              </p>
              <h6 class="font-semibold font-manrope text-xl leading-9 text-black">
                August 21, 2024
              </h6>
            </div>
            <div class="box group">
              <p class="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                Order
              </p>
              <h6 class="font-semibold font-manrope text-2xl leading-9 text-black">
                #1023498789
              </h6>
            </div>
            <div class="box group">
              <p class="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                Payment Method
              </p>

              <p className="font-semibold font-manrope text-xl leading-9 text-black">
                {" "}
                Cash On Delivery
              </p>
            </div>
            <div class="box group">
              <p class="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                Address
              </p>
              <p class="font-serif text-small leading-9 text-black">
                <p>
                  <b>HOUSE NO-</b> {cartItem?.shipping?.address}
                </p>
                <p>
                  {" "}
                  <b>CITY -</b> {cartItem?.shipping?.city}
                </p>

                <p>
                  <b>PINCODE- </b> {cartItem?.shipping?.zipCode}
                </p>
              </p>
            </div>
          </div>
          {cartItem?.lineItems?.map((item) => (
            <div class="grid grid-cols-7 w-full pb-6 border-b border-gray-100">
              <div class="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                <img
                  src={item.productImage}
                  alt="Skin Care Kit image"
                  class="w-full rounded-xl"
                />
              </div>
              <div class="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
                <div class="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                  <div class="">
                    <h6 class="font-manrope font-semibold text-2xl leading-9 text-black mb-6">
                      {item.pname}
                    </h6>
                    <p class="font-normal text-xl leading-8 text-gray-500">
                      Quantity :{" "}
                      <span class="text-black font-semibold">
                        {item.quantity}
                      </span>
                    </p>
                    <p class="font-normal text-xl leading-8 text-gray-500">
                      Size :{" "}
                      <span class="text-black font-semibold">{item.size}</span>
                    </p>
                  </div>

                  <h5 class="font-manrope font-semibold text-3xl leading-10 text-black sm:text-right mt-3">
                    Rs. {item.pprice}
                  </h5>
                </div>
              </div>
            </div>
          ))}

          <div class="flex items-center justify-center sm:justify-end w-full my-6">
            <div class=" w-full">
              <div class="flex items-center justify-between mb-6">
                <p class="font-normal text-xl leading-8 text-gray-500">
                  Subtotal
                </p>
                <p class="font-semibold text-xl leading-8 text-gray-900">
                  Rs. {cartItem?.subtotal}
                </p>
              </div>
              <div class="flex items-center justify-between mb-6">
                <p class="font-normal text-xl leading-8 text-gray-500">
                  Shipping Charge
                </p>
                <p class="font-semibold text-xl leading-8 text-gray-900">
                  Free
                </p>
              </div>

              <div class="flex items-center justify-between mb-6">
                <p class="font-normal text-xl leading-8 text-gray-500">
                  Discount
                </p>
                <p class="font-semibold text-xl leading-8 text-gray-900">
                  00.00
                </p>
              </div>
              <div class="flex items-center justify-between py-6 border-y border-gray-100">
                <p class="font-manrope font-semibold text-2xl leading-9 text-gray-900">
                  Total
                </p>
                <p class="font-manrope font-bold text-2xl leading-9 text-indigo-600">
                  Rs. {cartItem?.subtotal}
                </p>
              </div>
            </div>
          </div>
          <div class="data ">
            <p class="font-normal text-lg leading-8 text-gray-500 mb-11">
              We'll be sending a shipping confirmation email when the items
              shipped successfully.
            </p>
            <h6 class="font-manrope font-bold text-2xl leading-9 text-black mb-3">
              Thank you for shopping with us!
            </h6>
            <button
                    class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-black-700 dark:bg-black-600 dark:text-black dark:hover:bg-teal-900"
                    onClick={routeChange}
                  >
                    Continue Shopping
                  </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Order;
