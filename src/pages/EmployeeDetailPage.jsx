import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees } from "./api/api";
import {
  EmployeeCardLeftSide,
  EmployeePersonalDetail,
  EmployeeJobDetail,
} from "../components/Cards";

import NavbarVertical from "../layouts/navbars/NavbarVertical";

function EmployeeDetail() {
  const navigateTo = useNavigate();

  const handleBackButton = () => {
    navigateTo("/");
  };

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
          flexDirection: "column",
          alignItems: "center",
          padding: "120px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
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
            />
          )}
          {employee && (
            <EmployeePersonalDetail
              firstName={employee.firstName}
              secondName={employee.secondName}
              firstSurname={employee.firstSurname}
              secondSurname={employee.secondSurname}
              email={employee.email}
              phoneNumber={employee.phoneNumber}
              address={employee.address}
              dateOfBirth={employee.dateOfBirth}
              birthPlace={employee.birthPlace}
              tc={employee.tc}
            />
          )}
          {employee && (
            <EmployeeJobDetail
              startDate={employee.startDate}
              endDate={employee.endDate}
              isActive={employee.isActive ? "Aktif" : "Pasif"}
              position={employee.position}
              department={employee.department}
              company={employee.company}
              wage={employee.wage + " TL"}
            />
          )}
        </div>
        <div>
          <br />
          <button style={{ marginLeft: "264px" }} onClick={handleBackButton}>
            Geri Don
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetail;
