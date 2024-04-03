import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../providers/AuthContext";

export const useFetch = (url) => {
  const { validateSession, isAuthenticated, username } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        await validateSession();

        if (!isAuthenticated) {
          throw new Error("User not authenticated");
        }

        const response = await axios.get(url, { withCredentials: true });
        setData(response.data);
        setError(null);
      } catch (error) {
        try {

          await axios.post("auth/refreshToken", { username });

          const response = await axios.get(url, { withCredentials: true });
          setData(response.data);
          setError(null);
        } catch (refreshError) {
          setError("Unable to refresh token. Please log in again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, validateSession, isAuthenticated, username]);

  return { data, error, loading };
};
