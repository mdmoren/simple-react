import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const validateSession = useCallback(
    async () => {
      try {
        const response = await axios.post("/auth/validate", { username });

        localStorage.setItem("role", response.data.role);
        setRole(response.data.role);

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Session validation failed:", error);

        localStorage.removeItem("username");
        setUsername("");

        localStorage.setItem("isAuthenticated", "false");
        setIsAuthenticated(false);
      }
    },
    [username]
  );

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  const login = async (username, password) => {
    try {
      const response = await axios.post("/auth/login", {
        username: username,
        password: password,
      });

      localStorage.setItem("username", response.data.username);
      setUsername(response.data.username);

      localStorage.setItem("role", response.data.role);
      setRole(response.data.role);

      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed: ", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout", { username });

      localStorage.removeItem("username");
      setUsername("");

      localStorage.removeItem("role");
      setRole("");

      localStorage.setItem("isAuthenticated", "false");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed: ", error);
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      await axios.post("/auth/forgotPassword", { email });
    } catch (error) {
      console.error("Failed to send reset code: ", error);
      throw error;
    }
  };

  const resetPassword = async (code, newPassword) => {
    try {
      await axios.post("/auth/resetPassword", { code, newPassword });
    } catch (error) {
      console.error("Failed to reset password: ", error);
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      await axios.post("/auth/refreshToken", { username });
    } catch (error) {
      console.error("Failed to refresh token: ", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        role,
        login,
        logout,
        validateSession,
        forgotPassword,
        resetPassword,
        refreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
