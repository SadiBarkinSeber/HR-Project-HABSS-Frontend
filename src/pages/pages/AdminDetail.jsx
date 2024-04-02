import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSiteMng } from "../../components/AdminContext";
import {
  EmployeeCardLeftSide,
  EmployeePersonalDetail,
  EmployeeJobDetail,
} from "../../components/Cards";

function SiteManagerDetail() {
  const navigateTo = useNavigate();
  const { siteMngData } = useSiteMng(); // Site yöneticisi verilerini al

  const handleBackButton = () => {
    navigateTo("/");
  };

  return (
    <>
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
            <EmployeePersonalDetail
              firstName={siteMngData.firstName}
              secondName={siteMngData.secondName}
              firstSurname={siteMngData.firstSurname}
              secondSurname={siteMngData.secondSurname}
              email={siteMngData.email}
              phoneNumber={siteMngData.phoneNumber}
              address={siteMngData.address}
              dateOfBirth={siteMngData.dateOfBirth}
              birthPlace={siteMngData.birthPlace}
              tc={siteMngData.tc}
            />
          )}
          {siteMngData && (
            <EmployeeJobDetail
              startDate={siteMngData.startDate}
              endDate={siteMngData.endDate}
              isActive={siteMngData.isActive ? "Aktif" : "Pasif"}
              position={siteMngData.position}
              department={siteMngData.department}
              company={siteMngData.company}
              wage={siteMngData.wage + " TL"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default SiteManagerDetail;
