import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f0f1a] text-[#e8e8f0] flex justify-center items-start p-12 px-4 bg-[radial-gradient(circle_at_20%_30%,rgba(108,99,255,0.06)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(108,99,255,0.04)_0%,transparent_50%)] light:bg-[#f5f5f8] light:text-gray-800 light:bg-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
