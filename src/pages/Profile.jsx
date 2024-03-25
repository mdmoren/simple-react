import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../providers/AuthContext";

const api = {
  fetchProfile: () => axios.get("/user/myProfile", { withCredentials: true }),
  refreshToken: (username) => axios.post("/auth/refreshToken", { username }),
};

function Profile() {
  const [state, setState] = useState({
    profile: null,
    loading: true,
    error: "",
  });
  const { username } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.fetchProfile();
        setState(prevState => ({ ...prevState, profile: response.data, loading: false, error: '' }));
      } catch (error) {
        console.log("access token expired, attempting to request new one.");
        try {
          await api.refreshToken(username);
          const response = await api.fetchProfile();
          setState(prevState => ({ ...prevState, profile: response.data, loading: false, error: '' }));
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          setState(prevState => ({ ...prevState, error: 'Session expired, please log in again', loading: false }));
        }
      }
    };

    fetchProfile();

}, [username]);

  const { loading, error, profile } = state;

  if (loading) {
    return <div className="pt-20 text-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="pt-20 text-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20">
      <div className="flex flex-col max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
        <h1 className="text-center">Profile Page</h1>
        {profile && (
          <div>
            <p>
              <strong>username:</strong> {profile[0].username}
            </p>
            <p>
              <strong>email:</strong> {profile[0].email}
            </p>
            <p>
              <strong>id:</strong> {profile[0].id}
            </p>
            <p>
              <strong>firstName:</strong> {profile[0].firstName}
            </p>
            <p>
              <strong>lastName:</strong> {profile[0].lastName}
            </p>
            <p>
              <strong>status:</strong> {profile[0].status}
            </p>
            <p>
              <strong>role:</strong> {profile[0].roles}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
