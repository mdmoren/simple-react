import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./utils/ProtectedRoute";
import { AdminRoute } from "./utils/AdminRoute";

import Home from "./pages/Home";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/Profile/ChangePassword";
import ChangeEmail from "./pages/Profile/ChangeEmail";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/changePassword" element={<ChangePassword />} />
          <Route path="/profile/changeEmail" element={<ChangeEmail />} />\
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
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
