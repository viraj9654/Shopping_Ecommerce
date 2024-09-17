import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Review = () => {

  const token = localStorage.getItem('Token')
  const cartId=localStorage.getItem('cartId')
  const [cartItem, setcartItem] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/cart/get/${cartId}`, {
      
      headers: {
        "Content-Type": "application/json",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/cart/updateStatus/${cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
              'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(),
          credentials: "include",
        }
      );

      const result = await response.json();
      navigate("/summary");
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <section class="py-24 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div class="flex items-start flex-col gap-6 xl:flex-row ">
            <div class="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto">
              <div class="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
                <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200 ">
                  Order Summary
                </h2>
                <div class="data py-6 border-b border-gray-200">
                  <div class="flex items-center justify-between gap-4 mb-5">
                    <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Product Cost
                    </p>
                    <p class="font-medium text-lg leading-8 text-gray-900">
                      Rs. {cartItem?.subtotal}
                    </p>
                  </div>
                  <div class="flex items-center justify-between gap-4 mb-5">
                    <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Shipping
                    </p>
                    <p class="font-medium text-lg leading-8 text-gray-600">
                      00.00
                    </p>
                  </div>
                  <div class="flex items-center justify-between gap-4 ">
                    <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                      Coupon Code
                    </p>
                    <p class="font-medium text-lg leading-8 text-emerald-500">
                      #APPLIED
                    </p>
                  </div>
                </div>
                <div class="total flex items-center justify-between pt-6">
                  <p class="font-normal text-xl leading-8 text-black ">
                    Subtotal
                  </p>
                  <h5 class="font-manrope font-bold text-2xl leading-9 text-indigo-600">
                    Rs. {cartItem?.subtotal}
                  </h5>
                </div>
              </div>
              <div class="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
                <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200 ">
                  Address
                </h2>

                <div class="flex py-5 items-center justify-center">
                  <form class="grid w-60 sm:w-96 grid-cols-1 gap-2">
                    <div class="relative">
                      <input
                        class="peer hidden"
                        id="radio_1"
                        type="radio"
                        name="radio"
                        checked
                      />
                      <span class="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-indigo-500"></span>
                      <label
                        class="flex cursor-pointer flex-col rounded-lg border border-gray-300 p-4 peer-checked:border-4 peer-checked:border-indigo-700"
                        for="radio_1"
                      >
                        <span class="text-xs font-semibold uppercase">
                          <b>Name-</b>
                          {cartItem?.shipping?.firstName}{" "}
                          {cartItem?.shipping?.lastName}
                        </span>
                        <span class="text-xs font-semibold uppercase">
                          <b>House No-</b>
                          {cartItem?.shipping?.address}
                        </span>
                        <span class="text-xs font-semibold uppercase">
                          <b>City-</b>
                          {cartItem?.shipping?.city}
                        </span>
                        <span class="text-xs font-semibold uppercase">
                          <b>Pincode-</b>
                          {cartItem?.shipping?.zipCode}
                        </span>
                        <span class="text-xs font-semibold uppercase">
                          {" "}
                          <b>PhoneNo-</b>
                          {cartItem?.shipping?.phoneNumber}
                        </span>
                      </label>
                    </div>
                  </form>
                </div>
                <div class="mt-2 flex justify-center">
                  <button
                    class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-black dark:hover:bg-teal-900"
                    onClick={handleSubmit}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
            <div class="w-full max-w-sm md:max-w-3xl max-xl:mx-auto">
              {cartItem?.lineItems?.map((item) => (
                <div class="grid grid-cols-1 gap-6">
                  <div class="rounded-3xl p-6 bg-gray-100 border border-gray-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400">
                    <div class="img-box ">
                      <img
                        src={item.productImage}
                        alt="Denim Jacket image"
                        class="w-full md:max-w-[122px] rounded-lg"
                      />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                      <div class="">
                        <h2 class="font-medium text-xl leading-8 text-black mb-3">
                          {item.pname}
                        </h2>
                        <p class="font-normal text-lg leading-8 text-gray-500 ">
                          Size: {item.size}
                        </p>
                        <p class="font-normal text-lg leading-8 text-gray-500 ">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div class="flex items-center justify-between gap-8">
                        <div class="flex items-center gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_14099_1497)">
                              <path
                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_14099_1497">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_14099_1497)">
                              <path
                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_14099_1497">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_14099_1497)">
                              <path
                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_14099_1497">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_14099_1497)">
                              <path
                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_14099_1497">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_14099_1497)">
                              <path
                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_14099_1497">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <h6 class="font-medium text-xl leading-8 text-indigo-600">
                          Rs. {item.pprice}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;
