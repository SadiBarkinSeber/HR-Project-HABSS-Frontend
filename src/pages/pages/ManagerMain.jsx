import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchManager } from "../api/api";
import { EmployeeSumCard, EmployeeCardLeftSide } from "../../components/Cards";

function ManagerList() {
  const navigateTo = useNavigate();

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
          justifyContent: "center",
          padding: "120px",
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
          <EmployeeSumCard
            email={manager.email}
            phoneNumber={manager.phoneNumber}
            address={manager.address}
            routeDetailPage="/mng-detail"
          />
        )}
      </div>
    </>
  );
}

export default ManagerList;
