import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCompanies } from '../pages/api/api';

const CompanyContext = createContext();

export const useCompany = () => useContext(CompanyContext);

export const CompanyDataProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <CompanyContext.Provider value={companies}>
      {children}
    </CompanyContext.Provider>
  );
};