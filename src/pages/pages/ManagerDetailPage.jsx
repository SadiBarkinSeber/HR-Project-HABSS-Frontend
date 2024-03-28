import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchManager } from "../api/api";
import {
  EmployeeCardLeftSide,
  EmployeePersonalDetail,
  EmployeeJobDetail,
} from "../../components/Cards";

function ManagerDetail() {
  const navigateTo = useNavigate();

  const handleBackButton = () => {
    navigateTo("/");
  };

  const [manager, setManager] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchManager();
        setManager(data);
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
          padding: "50px 120px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {manager && (
            <EmployeeCardLeftSide
              firstName={manager.firstName}
              secondName={manager.secondName}
              firstSurname={manager.firstSurname}
              secondSurname={manager.secondSurname}
              department={manager.department}
              imagePath={manager.imagePath}
              routeUpdatePage="/mng-update"
            />
          )}
          {manager && (
            <EmployeePersonalDetail
              firstName={manager.firstName}
              secondName={manager.secondName}
              firstSurname={manager.firstSurname}
              secondSurname={manager.secondSurname}
              email={manager.email}
              phoneNumber={manager.phoneNumber}
              address={manager.address}
              dateOfBirth={manager.dateOfBirth}
              birthPlace={manager.birthPlace}
              tc={manager.tc}
            />
          )}
          {manager && (
            <EmployeeJobDetail
              startDate={manager.startDate}
              endDate={manager.endDate}
              isActive={manager.isActive ? "Aktif" : "Pasif"}
              position={manager.position}
              department={manager.department}
              company={manager.company}
              wage={manager.wage + " TL"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ManagerDetail;
