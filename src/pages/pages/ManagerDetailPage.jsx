import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMng } from "../../components/ManagerContext";
import {
  EmployeeCardLeftSide,
  EmployeePersonalDetail,
  EmployeeJobDetail,
} from "../../components/Cards";

function ManagerDetail() {
  const navigateTo = useNavigate();
  const { mngData, refreshData } = useMng();

  useEffect(() => {
    refreshData(); // Veriyi yenile
  }, []); // Sayfa yüklendiğinde bir kere çağrılacak

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
            <EmployeePersonalDetail
              firstName={mngData.firstName}
              secondName={mngData.secondName}
              firstSurname={mngData.firstSurname}
              secondSurname={mngData.secondSurname}
              email={mngData.email}
              phoneNumber={mngData.phoneNumber}
              address={mngData.address}
              dateOfBirth={mngData.dateOfBirth}
              birthPlace={mngData.birthPlace}
              tc={mngData.tc}
            />
          )}
          {mngData && (
            <EmployeeJobDetail
              startDate={mngData.startDate}
              endDate={mngData.endDate}
              isActive={mngData.isActive ? "Aktif" : "Pasif"}
              position={mngData.position}
              department={mngData.department}
              company={mngData.company}
              wage={mngData.wage + " TL"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ManagerDetail;
