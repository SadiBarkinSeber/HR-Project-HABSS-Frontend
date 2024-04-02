import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeSumCard, EmployeeCardLeftSide } from "../../components/Cards";
import { useSiteMng } from "../../components/AdminContext";

function SiteManagerList() {
  const navigateTo = useNavigate();
  const { siteMngData } = useSiteMng(); // Site yöneticisi verilerini al

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "120px",
        }}
      >
        {siteMngData && (
          <EmployeeCardLeftSide
            firstName={siteMngData.firstName}
            secondName={siteMngData.secondName}
            firstSurname={siteMngData.firstSurname}
            secondSurname={siteMngData.secondSurname}
            department={siteMngData.department}
            imagePath={siteMngData.imagePath}
            routeUpdatePage="/admin-update"
          />
        )}
        {siteMngData && (
          <EmployeeSumCard
            email={siteMngData.email}
            phoneNumber={siteMngData.phoneNumber}
            address={siteMngData.address}
            routeDetailPage="/admin-detail"
          />
        )}
      </div>
    </>
  );
}

export default SiteManagerList;
