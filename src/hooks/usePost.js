import { useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../providers/AuthContext";

export const usePost = (url) => {
  const { validateSession, isAuthenticated, username } = useAuth();
  const [data, setData] = useState(null);
  const [postError, setPostError] = useState(null);
  const [loading, setLoading] = useState(false);

    const makeRequest = useCallback(async (requestBody) => {
      try {

        setLoading(true);

        await validateSession();

        if (!isAuthenticated) {
          throw new Error("User not authenticated");
        }

        const response = await axios.post(url, requestBody,{ withCredentials: true });
        setData(response.data);
        setPostError(null);
      } catch (error) {
        try {
          await axios.post("auth/refreshToken", { username });

          const response = await axios.post(url, requestBody,{ withCredentials: true });
          setData(response.data);
          setPostError(null);
        } catch (refreshError) {
            setPostError("Error: could not change your password. Please make sure your old password is correct.");
        }
      } finally {
        setLoading(false);
      }
    }, [url,validateSession, isAuthenticated, username])

  return { makeRequest, data, postError, loading };
};
