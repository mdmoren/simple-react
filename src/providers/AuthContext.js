import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateSession = useCallback(async (page) => {
    try {
      const response = await axios.post("/auth/validate", { username });
      console.log("Validating session from " + page);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Session validation failed:", error);
      localStorage.removeItem("username");
      setUsername("");
      setIsAuthenticated(false);
    }
  }, [username]);

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", {
        username: email,
        password: password,
      });

      localStorage.setItem("username", response.data.userData.username);
      setUsername(response.data.userData.username);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout", { username });
      localStorage.removeItem("username");
      setUsername("");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, validateSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
