import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees2 } from "../api/api";

function ManagerEmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchEmployees2();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }
    fetchData();
  }, []);

  const handleViewDetails = (employeeId) => {
    // Detay sayfasına yönlendir
    navigate(`/emp-detail`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Çalışan Listesi</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Telefon</th>
            <th>E-posta</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.firstSurname}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.email}</td>
              <td>{employee.isActive ? "Aktif" : "Pasif"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewDetails(employee.id)}
                >
                  Detayları Gör
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerEmployeeList;
