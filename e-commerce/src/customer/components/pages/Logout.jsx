import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../App";
const Logout = () => {
  const token = localStorage.getItem("Token");
  const { state, dispatch } = useContext(userContext);

  
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8080/user/logout?token=${token}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((response) => {
        dispatch({ typr: "USER", payload: false });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.text();
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
     
    </div>
  );
};

export default Logout;
