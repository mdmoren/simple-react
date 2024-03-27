import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const validateSession = useCallback(async (page) => {
    try {
      await axios.post("/auth/validate", { username });

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Session validation failed:", error);

      localStorage.removeItem("username");
      setUsername("");

      localStorage.setItem("isAuthenticated", "false");
      setIsAuthenticated(false);
    }
  }, [username]);

  useEffect(() => {
    validateSession("provider");
  }, [validateSession]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", {
        username: email,
        password: password,
      });

      localStorage.setItem("username", response.data.userData.username);
      setUsername(response.data.userData.username);

      localStorage.setItem("isAuthenticated", "true");
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

      localStorage.setItem("isAuthenticated", "false");
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
