import React from 'react'

export const isAuthenticated = () => {
  // Check if token exists in sessionStorage
  return !!localStorage.getItem('Token');
};
const Auth = () => {
  return (
    <div>
      
    </div>
  )
}

export default Auth
