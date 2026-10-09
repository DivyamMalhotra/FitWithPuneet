import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

export default function App() {
  const { user } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user?.isAdmin ? <Admin /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <WhatsAppButton />
    </>
  );
}
