import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSiteManagers } from "../api/api";
import {
  EmployeeCardLeftSide,
  EmployeePersonalDetail,
  EmployeeJobDetail,
} from "../../components/Cards";

function SiteManagerDetail() {
  const navigateTo = useNavigate();

  const handleBackButton = () => {
    navigateTo("/");
  };

  const [siteManager, setSiteManager] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSiteManagers();
        setSiteManager(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          {siteManager && (
            <EmployeeCardLeftSide
              firstName={siteManager.firstName}
              secondName={siteManager.secondName}
              firstSurname={siteManager.firstSurname}
              secondSurname={siteManager.secondSurname}
              department={siteManager.department}
              imagePath={siteManager.imagePath}
              routeUpdatePage="/sitemanager-update"
            />
          )}
          {siteManager && (
            <EmployeePersonalDetail
              firstName={siteManager.firstName}
              secondName={siteManager.secondName}
              firstSurname={siteManager.firstSurname}
              secondSurname={siteManager.secondSurname}
              email={siteManager.email}
              phoneNumber={siteManager.phoneNumber}
              address={siteManager.address}
              dateOfBirth={siteManager.dateOfBirth}
              birthPlace={siteManager.birthPlace}
              tc={siteManager.tc}
            />
          )}
          {siteManager && (
            <EmployeeJobDetail
              startDate={siteManager.startDate}
              endDate={siteManager.endDate}
              isActive={siteManager.isActive ? "Aktif" : "Pasif"}
              position={siteManager.position}
              department={siteManager.department}
              company={siteManager.company}
              wage={siteManager.wage + " TL"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default SiteManagerDetail;
