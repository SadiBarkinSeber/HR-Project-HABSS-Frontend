import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchManager } from "../api/api";
import { EmployeeSumCard, EmployeeCardLeftSide } from "../../components/Cards";
import { useMng } from "../../components/ManagerContext";
function ManagerList() {
  const navigateTo = useNavigate();

  const { mngData, refreshData } = useMng();

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
        {mngData && (
          <EmployeeCardLeftSide
            firstName={mngData.firstName}
            secondName={mngData.secondName}
            firstSurname={mngData.firstSurname}
            secondSurname={mngData.secondSurname}
            department={mngData.department}
            imagePath={mngData.imagePath}
            routeUpdatePage="/mng-update"
          />
        )}
        {mngData && (
          <EmployeeSumCard
            email={mngData.email}
            phoneNumber={mngData.phoneNumber}
            address={mngData.address}
            routeDetailPage="/mng-detail"
          />
        )}
      </div>
    </>
  );
}

export default ManagerList;
