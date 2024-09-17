import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../App";



const Sign = () => {

  const {state,dispatch} = useContext(userContext);



  const initialFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setMessage("");
  };
  const [message, setMessage] = useState("");

  const Modal = ({ message, onClose }) => {
    if (!message) return null;

    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
        onClick={onClose}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span class="block sm:inline">{message}.</span>
        </div>
      </div>
    );
  };

  // let mail = formData.email;
  // console.log(mail);

  let navigate = useNavigate();
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.email == "" || formData.email == null) {
      setMessage("please enter valid email");
    }
    if (formData.password == null || formData.password == "") {
      setMessage("please enter Password");
    }
    if (formData.email == "" && formData.password == "") {
      setMessage("please enter email or password");
    }

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });


      if (response.status === 401) {
        setMessage("please enter valid details")
      
      } else {
        dispatch({type:"USER",payload:true})
        // alert("login success")

        navigate("/")
      

    // Force a page reload
    window.location.reload();
        
      }
      const result = await response.json();
      localStorage.setItem('Token',result.jwt)
      localStorage.setItem('cartId', result.cartId);
      setFormData(initialFormData);
      console.log("Success:", result);
     
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const token = localStorage.getItem('Token')
  // console.log(token);
  // console.log(localStorage.getItem('cartId'))


  
  return (
    <>
      <section class="bg-gray-50 ">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <span>
              {" "}
              <Modal message={message} />
            </span>
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 "
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="remember" class="text-gray-500 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    class="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  class="w-full text-black  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
                <p class="text-sm font-light text-black font-medium">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    class="font-medium text-primary-600 hover:underline text-cyan-400"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sign;
