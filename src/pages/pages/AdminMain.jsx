import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSiteManagers } from "../api/api";
import { EmployeeSumCard, EmployeeCardLeftSide } from "../../components/Cards";

function SiteManagerList() {
  const navigateTo = useNavigate();

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
        {siteManager && (
          <EmployeeCardLeftSide
            firstName={siteManager.firstName}
            secondName={siteManager.secondName}
            firstSurname={siteManager.firstSurname}
            secondSurname={siteManager.secondSurname}
            department={siteManager.department}
            imagePath={siteManager.imagePath}
            routeUpdatePage="/admin-update"
          />
        )}
        {siteManager && (
          <EmployeeSumCard
            email={siteManager.email}
            phoneNumber={siteManager.phoneNumber}
            address={siteManager.address}
            routeDetailPage="/admin-detail"
          />
        )}
      </div>
    </>
  );
}

export default SiteManagerList;
