import React, { createContext, useContext, useState } from "react";

// Create a new context
const AuthContext = createContext();

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState("");

  // Function to set the token in the context
  const setAuthToken = (newToken, role) => {
    setToken(newToken);
    setUserRole(role);
  };

  return (
    <AuthContext.Provider
      value={{ token, userRole, setAuthToken, setUserRole }}
    >
      {" "}
      {/* setUserRole'u da ekleyin */}
      {children}
    </AuthContext.Provider>
  );
};
