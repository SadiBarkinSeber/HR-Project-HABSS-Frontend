import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchEmployees } from "../pages/api/api";
import { useAuth } from "./TokenContext";
import { jwtDecode } from "jwt-decode";

const EmployeeContext = createContext();

export const useEmp = () => useContext(EmployeeContext);

export const EmployeeDataProvider = ({ children }) => {
  const { token } = useAuth();
  const [empData, setEmpData] = useState(null);
  const storedToken = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        const userIdString = decodedToken.nameid;
        const userId = userIdString ? parseInt(userIdString) : null;
        console.log(userId);
        const data = await fetchEmployees(userId);
        localStorage.setItem("empId", data.id);
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
