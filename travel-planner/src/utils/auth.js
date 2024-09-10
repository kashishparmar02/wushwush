// src/utils/auth.js
export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const isAuthenticated = () => {
    const token = getToken();
    // Simple check for token presence; you can enhance this by verifying token expiration
    return !!token;
  };