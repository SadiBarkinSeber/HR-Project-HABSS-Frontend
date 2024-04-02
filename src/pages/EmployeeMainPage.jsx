import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees } from "./api/api";
import { useEmp } from "../components/EmployeeContext";
import { EmployeeSumCard, EmployeeCardLeftSide } from "../components/Cards";
import NavbarVertical from "../layouts/navbars/NavbarVertical";
function EmployeeList() {
  const { empData, refreshData } = useEmp();

  useEffect(() => {
    refreshData();
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
        {empData && (
          <EmployeeCardLeftSide
            firstName={empData.firstName}
            secondName={empData.secondName}
            firstSurname={empData.firstSurname}
            department={empData.department}
            imagePath={empData.imagePath}
            routeUpdatePage="/emp-update"
          />
        )}
        {empData && (
          <EmployeeSumCard
            email={empData.email}
            phoneNumber={empData.phoneNumber}
            address={empData.address}
            routeDetailPage="/emp-detail"
          />
        )}
      </div>
    </>
  );
}

export default EmployeeList;
