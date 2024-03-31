import React, { useState, useEffect } from "react";
import { useEmp } from "../components/EmployeeContext";
import {
  EmployeeCardLeftSide,
  EmployeePersonalDetail,
  EmployeeJobDetail,
} from "../components/Cards";

import NavbarVertical from "../layouts/navbars/NavbarVertical";

function EmployeeDetail() {
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
          flexDirection: "column",
          alignItems: "center",
          padding: "50px 120px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {empData && (
            <EmployeeCardLeftSide
              firstName={empData.firstName}
              secondName={empData.secondName}
              firstSurname={empData.firstSurname}
              secondSurname={empData.secondSurname}
              department={empData.department}
              imagePath={empData.imagePath}
              routeUpdatePage="/emp-update"
            />
          )}
          {empData && (
            <EmployeePersonalDetail
              firstName={empData.firstName}
              secondName={empData.secondName}
              firstSurname={empData.firstSurname}
              secondSurname={empData.secondSurname}
              email={empData.email}
              phoneNumber={empData.phoneNumber}
              address={empData.address}
              dateOfBirth={empData.dateOfBirth}
              birthPlace={empData.birthPlace}
              tc={empData.tc}
            />
          )}
          {empData && (
            <EmployeeJobDetail
              startDate={empData.startDate}
              endDate={empData.endDate}
              isActive={empData.isActive ? "Aktif" : "Pasif"}
              position={empData.position}
              department={empData.department}
              company={empData.company}
              wage={empData.wage + " TL"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default EmployeeDetail;
