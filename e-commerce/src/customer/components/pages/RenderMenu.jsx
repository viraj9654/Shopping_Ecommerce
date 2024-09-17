import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RenderMenu = () => {
  const auth=localStorage.getItem('Token')
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('Token'); // or sessionStorage
    setToken(storedToken);
  }, []);
  const navigate=useNavigate();
  const handleLogout = async() => {
      fetch(`http://localhost:8080/user/logout?token=${auth}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      })
        .then((response) => response.text())
        .then((data) => {
          localStorage.removeItem('Token'); 
          setToken(null); 
          navigate("/sign")
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
   
  
  };



  const [user, setUser] = useState(null);

  useEffect(() => {
    // Assuming the token is stored in localStorage
   
    if (auth) {
      try {
        // Decode the token
        const decodedToken = jwtDecode(auth);
        // console.log(decodedToken);
        setUser(decodedToken);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);
  
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/user/by/username?username=${user?.sub}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data);
        setUserDetails(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },[user?.sub, token]);

  return (
    <>
      {!token ? (
        <>
          <a
            href="/sign"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            Sign in
          </a>
          <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
          <a
            href="/registration"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            Create account
          </a>
        </>
      ) : (
          <>
             {userDetails ? (
            <p
          
          className="text-m font-medium text-gray-700 hover:text-gray-800"
        
        >
         {userDetails?.name}
            </p>
               ) : (
                <p>No user details available.</p>
              )}
          <button>
        <a
          
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
          onClick={handleLogout}
        >
          Logout
            </a>
            </button>
            </>
      )}
    </>
  );
};


export default RenderMenu
