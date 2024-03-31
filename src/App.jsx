import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { ProtectedRoutes } from "./utils/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
