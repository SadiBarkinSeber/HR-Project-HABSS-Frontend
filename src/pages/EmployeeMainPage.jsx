import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees } from "./api/api";
import { EmployeeSumCard, EmployeeCardLeftSide } from "../components/Cards";
import NavbarVertical from "../layouts/navbars/NavbarVertical";

function EmployeeList() {
  const navigateTo = useNavigate();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees();
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <div className="navbar-vertical navbar">
        <NavbarVertical />
      </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "120px",
        }}
      >
        {employee && (
          <EmployeeCardLeftSide
            firstName={employee.firstName}
            secondName={employee.secondName}
            firstSurname={employee.firstSurname}
            secondSurname={employee.secondSurname}
            department={employee.department}
            imagePath={employee.imagePath}
            routeUpdatePage="/emp-update"
          />
        )}
        {employee && (
          <EmployeeSumCard
            email={employee.email}
            phoneNumber={employee.phoneNumber}
            address={employee.address}
            routeDetailPage="/emp-detail"
          />
        )}
      </div>
    </>
  );
}

export default EmployeeList;
