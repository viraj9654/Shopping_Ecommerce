import React from 'react'
export const initialState = null;

export const reducer = (state,action) => {
  
  if (action.type === "USER") {
    return action.payload;
  }
  return state;
}