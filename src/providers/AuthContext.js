import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", {
        username: email,
        password: password,
      });

      console.log(response);

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Propagate error to handle it in Login component
    }
  };

  const logout = async (username) => {
    try {
      await axios.post("/auth/logout", { username });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; // Propagate error to handle it in Logout component
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
