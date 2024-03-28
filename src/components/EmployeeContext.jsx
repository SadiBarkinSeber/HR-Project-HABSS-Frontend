import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchEmployees } from '../pages/api/api';

const EmployeeContext = createContext();

export const useEmp = () => useContext(EmployeeContext);

export const EmployeeDataProvider = ({ children }) => {
    const [empData, setEmpData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEmployees();
                setEmpData(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchData();

    }, []); // Boş bağımlılık dizisi kullanarak, sadece bileşenin ilk render edildiğinde çalışmasını sağlayın.

    return (
        <EmployeeContext.Provider value={{ empData, setEmpData }}>
            {children}
        </EmployeeContext.Provider>
    );
};














