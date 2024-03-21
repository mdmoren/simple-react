import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Other from "./pages/Other";
import Login from "./pages/Login";

function App() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/other" element={<Other />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </div>
  );
}

export default App;
