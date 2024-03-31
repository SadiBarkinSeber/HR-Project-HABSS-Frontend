import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchManager } from "../pages/api/api";
import { useAuth } from "./TokenContext";
import { jwtDecode } from "jwt-decode";

const ManagerContext = createContext();

export const useMng = () => useContext(ManagerContext);

export const ManagerDataProvider = ({ children }) => {
  const { token } = useAuth();
  const [mngData, setMngData] = useState(null);

  const fetchData = async () => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userIdString = decodedToken.nameid;
        const userId = userIdString ? parseInt(userIdString) : null;
        const data = await fetchManager(userId);
        setMngData(data);
      }
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const refreshData = () => {
    fetchData();
  };

  return (
    <ManagerContext.Provider value={{ mngData, refreshData }}>
      {children}
    </ManagerContext.Provider>
  );
};
