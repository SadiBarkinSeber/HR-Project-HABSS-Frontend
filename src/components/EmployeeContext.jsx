import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchEmployees } from "../pages/api/api";
import { useAuth } from "./TokenContext";
import { jwtDecode } from "jwt-decode";

const EmployeeContext = createContext();

export const useEmp = () => useContext(EmployeeContext);

export const EmployeeDataProvider = ({ children }) => {
  const { token } = useAuth();
  const [empData, setEmpData] = useState(null);

  const fetchData = async () => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userIdString = decodedToken.nameid;
        const userId = userIdString ? parseInt(userIdString) : null;
        const data = await fetchEmployees(userId);
        setEmpData(data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const refreshData = () => {
    fetchData();
  };

  return (
    <EmployeeContext.Provider value={{ empData, refreshData }}>
      {children}
    </EmployeeContext.Provider>
  );
};
