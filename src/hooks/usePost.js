import { useState } from "react";
import axios from "axios";
import { useAuth } from "../providers/AuthContext";

const usePost = () => {
  const { validateSession, isAuthenticated, refreshToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const postData = async (url, requestData) => {
    setLoading(true);
    try {
      await validateSession();

      if (!isAuthenticated) {
        throw new Error("User not authenticated");
      }

      const response = await axios.post(url, requestData, {
        withCredentials: true,
      });
      setData(response.data);
      setError("");
      setSuccess("Success");
    } catch (error) {
      try {
        await refreshToken();

        const response = await axios.post(url, requestData, {
          withCredentials: true,
        });
        setData(response.data);
        setError("");
        setSuccess("Success");
      } catch (refreshError) {
        setError("Unable to refresh token. Please log in again.");
      }
    }
    setLoading(false);
  };

  return { loading, success, error, data, postData };
};

export default usePost;
