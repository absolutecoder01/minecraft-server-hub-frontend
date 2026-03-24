import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { AddServer } from "./pages/AddServer";
import { EditServer } from "./pages/EditServer";
import { AdminDashboard } from './pages/AdminDashboard';
import { RegisterNewUser } from "./pages/RegisterNewUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-server" element={<AddServer />} />
            <Route path="/edit-server/:id" element={<EditServer />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/register_new_user" element={<RegisterNewUser/>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
