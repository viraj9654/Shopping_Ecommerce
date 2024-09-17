import React from "react";
import { useState } from "react";

const Registration = () => {
  const token=localStorage.getItem('Token')
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
         credentials: "include" 
      });

      if (response.ok && formData.password === formData.cpassword) {
        const result = await response.json();
        setFormData(initialFormData);
        console.log("Success:", result);
        alert("Succesflly Registered");
      } else {
        console.error("Error:", response.statusText);
        alert("Passwords do not match");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div class="max-w-4xl mx-auto font-[sans-serif] p-6">
        <div class="text-center mb-16">
          <a href="javascript:void(0)"></a>
          <h4 class="text-gray-800 text-base font-semibold mt-6">
            Sign up into your account
          </h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div class="grid sm:grid-cols-2 gap-8">
            <div>
              <label class="text-gray-800 text-sm mb-2 block">First Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email Id</label>
              <input
                value={formData.email}
                onChange={handleChange}
                name="email"
                type="text"
                class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <input
                value={formData.password}
                onChange={handleChange}
                name="password"
                type="password"
                class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">
                Confirm Password
              </label>
              <input
                value={formData.cpassword}
                onChange={handleChange}
                name="cpassword"
                type="password"
                class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter confirm password"
              />
            </div>
          </div>

          <div class="!mt-12">
            <button
              type="submit"
              class="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
