import { useState, useEffect, createContext, useContext } from "react";
import { authAPI, serversAPI } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password);
      localStorage.setItem("username", response.username);
      localStorage.setItem('role', response.role);
      setUser({ username: response.username, role: response.role });
    } catch (error) {
        setUser(null);
    }
  };
  const logout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem("username");
      localStorage.removeItem('role');
      setUser(null);
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
          await serversAPI.getAll();
          const username = localStorage.getItem('username');
          const role = localStorage.getItem('role');
          if (username) {
            setUser({ username, role });
          }
      } catch (error) {
        setUser(null);
      }
      setIsLoading(false);
    };
    checkAuth();

  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
