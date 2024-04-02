import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchSiteManagers } from "../pages/api/api";
import { useAuth } from "./TokenContext";
import { jwtDecode } from "jwt-decode";

const SiteManagerContext = createContext();

export const useSiteMng = () => useContext(SiteManagerContext);

export const SiteManagerDataProvider = ({ children }) => {
  const { token } = useAuth();
  const [siteMngData, setSiteMngDataData] = useState(null);

  const fetchData = async () => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userIdString = decodedToken.nameid;
        const userId = userIdString ? parseInt(userIdString) : null;
        const data = await fetchSiteManagers(userId);
        setSiteMngDataData(data);
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
    <SiteManagerContext.Provider value={{ siteMngData, refreshData }}>
      {children}
    </SiteManagerContext.Provider>
  );
};
