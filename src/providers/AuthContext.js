import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('authToken') !== null
  );

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", {
        username: email,
        password: password,
      });

      console.log(response);

      localStorage.setItem('authToken', response.data.userData.accessToken);
      localStorage.setItem('username', response.data.userData.username);

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error; 
    }
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout", { username: localStorage.getItem('username') });
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');

      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; 
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
