import React, { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setCurrentUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const res = await apiLogin(credentials);
      if (res.ok) {
        const { user, token } = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setCurrentUser(user);
        setToken(token);
        return { success: true };
      } else {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Error al iniciar sesión",
        };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "Error de red o del servidor" };
    }
  };

  const register = async (userData) => {
    try {
      const res = await apiRegister(userData);

      if (res.ok) {
        const { user, token } = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setCurrentUser(user);
        setToken(token);
        return { success: true };
      } else {
        const errorData = await res.json();

        return {
          success: false,
          message: errorData.error || "Error al registrarse",
        };
      }
    } catch (err) {
      console.error("Register error:", err);
      return { success: false, message: "Error de red o del servidor" };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        isAuthenticated: !!currentUser,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
