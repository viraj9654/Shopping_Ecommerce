import React from "react";
import { useState, useEffect } from "react";
const OrderConfirmation = () => {
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

  
  return (
    <>
      <section class="py-24 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 class="font-manrope font-bold text-4xl leading-10 text-black text-center">
            Payment Successful
          </h2>
          <p class="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
            Thanks for making a purchase you can check our order summary from
            below
          </p>
          <div class="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
              <div class="data">
                <p class="font-semibold text-base leading-7 text-black">
                  Order Id:{" "}
                  <span class="text-indigo-600 font-medium">#10234987</span>
                </p>
                <p class="font-semibold text-base leading-7 text-black mt-4">
                  Order Payment :{" "}
                  <span class="text-gray-400 font-medium">
                    {" "}
                    22th august 2024
                  </span>
                </p>

                <div class="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-4">
                  <h4 class="text-lg font-semibold text-black dark:text-black">
                   Shipping & Delivery information
                  </h4>

                  <dl>
                    <dt class="text-base font-medium text-black dark:text-black">
                     Name:  {cartItem?.shipping?.firstName}
                    </dt>
                    <dd class="mt-1 text-base font-normal text-black dark:text-black">
                      {cartItem?.shipping?.address}
                    </dd>
                  </dl>

                  <button
                    type="button"
                    data-modal-target="billingInformationModal"
                    data-modal-toggle="billingInformationModal"
                    class="text-base font-medium text-primary-700 hover:underline dark:text-primary-500"
                  >
                    Edit
                  </button>
                </div>
              </div>
              <button class="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                Track Your Order
              </button>
            </div>
            <div class="w-full px-3 min-[400px]:px-6">
              {cartItem?.lineItems?.map((items) => (
                <div class="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                  <div class="img-box max-lg:w-full">
                    <img
                      src={items.productImage}
                      alt="Premium Watch image"
                      class="aspect-square w-full lg:max-w-[140px] rounded-xl"
                    />
                  </div>
                  <div class="flex flex-row items-center w-full ">
                    <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
                      <div class="flex items-center">
                        <div class="">
                          <h2 class="font-semibold text-xl leading-8 text-black mb-3">
                            {items.pname}
                          </h2>
                          <p class="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                            By: Dust Studios
                          </p>
                          <div class="flex items-center ">
                            <p class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                              Size:{" "}
                              <span class="text-gray-500">{items.size}</span>
                            </p>
                            <p class="font-medium text-base leading-7 text-black ">
                              Qty:{" "}
                              <span class="text-gray-500">
                                {items.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="grid grid-cols-5">
                        <div class="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                          <div class="flex gap-3 lg:block">
                            <p class="font-medium text-sm leading-7 text-black">
                              price
                            </p>
                            <p class="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                              Rs. {items.pprice}
                            </p>
                          </div>
                        </div>
                        <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                          <div class="flex gap-3 lg:block">
                            <p class="font-medium text-sm leading-7 text-black">
                              Status
                            </p>
                            <p class="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                              Ready for Delivery
                            </p>
                          </div>
                        </div>
                        <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                          <div class="flex gap-3 lg:block">
                            <p class="font-medium text-sm whitespace-nowrap leading-6 text-black">
                              Expected Delivery Time
                            </p>
                            <p class="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                              23rd August 2024
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div class="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
              <div class="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                <button class="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                  <svg
                    class="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                      stroke=""
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>
                  Cancel Order
                </button>
                <p class="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                  Payment Mode{" "}
                  <span class="text-gray-500">Cash On Delivery</span>
                </p>
              </div>
              <p class="font-semibold text-lg text-black py-6">
                Total Price:{" "}
                <span class="text-indigo-600"> Rs. {cartItem?.subtotal}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

   
      {/* <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div class="flex justify-start item-start space-y-2 flex-col">
          <h1 class="text-3xl dark:text-black lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Order #13432
          </h1>
          <p class="text-base dark:text-black font-medium leading-6 text-black">
            21st Mart 2021 at 10:34 PM
          </p>
        </div>
        <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            {cartItem?.lineItems?.map((item) => (
              <div class="flex flex-col justify-start items-start 	 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p class="text-lg md:text-xl dark:text-black font-semibold leading-6 xl:leading-5 text-gray-800">
                  Customer’s Cart
                </p>
                <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                  <div class="pb-4 md:pb-8 w-full md:w-40">
                    <img
                      class="w-full hidden md:block"
                      src={item.productImage}
                      alt="dress"
                    />
                    <img
                      class="w-full md:hidden"
                      src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                      alt="dress"
                    />
                  </div>
                  <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div class="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 class="text-xl dark:text-black xl:text-2xl font-semibold leading-6 text-gray-800">
                        {item.pname}
                      </h3>
                      <div class="flex justify-start items-start flex-col space-y-2">
                        <p class="text-sm dark:text-black leading-none text-gray-800">
                          <span class="dark:text-black text-gray-300">
                            Size:{}
                          </span>{" "}
                          {item.size}
                        </p>
                        <p class="text-sm dark:text-black leading-none text-gray-800">
                          <span class="dark:text-black text-gray-300">
                            Quantity:{" "}
                          </span>{" "}
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div class="flex justify-between space-x-8 items-start w-full">
                      <p class="text-base dark:text-black xl:text-lg leading-6">
                        Rs.{item.pprice}{" "}
                      </p>
                      <p class="text-base dark:text-black xl:text-lg leading-6 text-gray-800">
                        01
                      </p>
                      <p class="text-base dark:text-black xl:text-lg font-semibold leading-6 text-gray-800">
                        Rs.{item.pprice}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 	 space-y-6">
                <h3 class="text-xl dark:text-black font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div class="flex justify-between w-full">
                    <p class="text-base dark:text-black leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p class="text-base dark:text-black leading-4 text-gray-600">
                      Rs.{cartItem.subtotal}{" "}
                    </p>
                  </div>
                  <div class="flex justify-between items-center w-full">
                    <p class="text-base dark:text-black leading-4 text-gray-800">
                      Discount{" "}
                      <span class="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-black leading-3 text-gray-800">
                        STUDENT
                      </span>
                    </p>
                    <p class="text-base dark:text-black leading-4 text-gray-600">
                      (0.0%)
                    </p>
                  </div>
                  <div class="flex justify-between items-center w-full">
                    <p class="text-base dark:text-black leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p class="text-base dark:text-black leading-4 text-gray-600">
                      Free
                    </p>
                  </div>
                </div>
                <div class="flex justify-between items-center w-full">
                  <p class="text-base dark:text-black font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p class="text-base dark:text-black font-semibold leading-4 text-gray-600">
                    Rs. {cartItem.subtotal}
                  </p>
                </div>
              </div>
              <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                <h3 class="text-xl dark:text-black font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div class="flex justify-between items-start w-full">
                  <div class="flex justify-center items-center space-x-4">
                    <div class="w-8 h-8">
                      <img
                        class="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div class="flex flex-col justify-start items-center">
                      <p class="text-lg leading-6 dark:text-black font-semibold text-gray-800">
                        DPD Delivery
                        <br />
                        <span class="font-normal">Delivery with 24 Hours</span>
                      </p>
                    </div>
                  </div>
                  <p class="text-lg font-semibold leading-6 dark:text-black text-gray-800">
                    Free
                  </p>
                </div>
                <div class="w-full flex justify-center items-center">
                  <button class="hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                    View Carrier Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 bg-slate-100	w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 class="text-xl dark:text-black font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div class="flex flex-col justify-start items-start flex-shrink-0">
                <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    alt="avatar"
                  />
                  <div class="flex justify-start items-start flex-col space-y-2">
                    <p class="text-base dark:text-black font-semibold leading-4 text-left text-gray-800">
                      {cartItem?.shipping?.firstName}
                      <span> {cartItem?.shipping?.lastName}</span>
                    </p>
                    <p class="text-sm dark:text-black leading-5 text-gray-600">
                      (+91) {cartItem?.shipping?.phoneNumber}
                    </p>
                  </div>
                </div>

                <div class="flex justify-center text-black dark:text-black md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <img
                    class="dark:hidden"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                    alt="email"
                  />
                  <img
                    class="hidden dark:block"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg"
                    alt="email"
                  />
                  <p class="cursor-pointer text-sm leading-5 ">
                    david89@gmail.com
                  </p>
                </div>
              </div>
              <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p class="text-base dark:text-black font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p class="w-48 lg:w-full dark:text-black xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      <b>House NO:</b> {cartItem?.shipping?.address}
                      <p>
                        {" "}
                        <b>City:</b> {cartItem?.shipping?.city}
                      </p>
                      <p>
                        <b>PinCode:</b> {cartItem?.shipping?.zipCode}
                      </p>
                    </p>
                  </div>
                  <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p class="text-base dark:text-black font-semibold leading-4 text-center md:text-left text-gray-800">
                      Billing Address
                    </p>
                    <p class="w-48 lg:w-full dark:text-black xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      <b>House NO:</b> {cartItem?.shipping?.address}
                      <p>
                        {" "}
                        <b>City:</b> {cartItem?.shipping?.city}
                      </p>
                      <p>
                        {" "}
                        <b>PinCode:</b> {cartItem?.shipping?.zipCode}
                      </p>
                    </p>
                  </div>
                </div>
                <div class="flex w-full justify-center items-center md:justify-start md:items-start"></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default OrderConfirmation;
