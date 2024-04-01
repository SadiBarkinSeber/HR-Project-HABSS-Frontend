import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateEmployee, uploadPhotoAndGetPath } from "./api/api";
import {
  EmployeeUpdateCardLeftSide,
  EmployeePersonalUpdate,
} from "../components/Cards";
import NavbarVertical from "../layouts/navbars/NavbarVertical";
import { useEmp } from "../components/EmployeeContext";

function EmployeeUpdate() {
  const { empData, refreshData } = useEmp();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [photoPath, setPhotoPath] = useState("");

  useEffect(() => {
    if (empData) {
      setPhoneNumber(empData.phoneNumber);
      setAddress(empData.address);
      setPhotoPath(empData.imagePath);
    }
  }, [empData]);

  const handleUpdateEmployee = async () => {
    try {
      // Adres alanında en az bir harf kontrolü
      if (/[a-zA-Z]/.test(address)) {
        const updatedEmp = await updateEmployee(
          empData.id,
          phoneNumber,
          address,
          photoPath
        );
        console.log("Güncellenmiş Çalışan:", updatedEmp);

        toast.success("Çalışan başarıyla güncellendi.", {
          position: "top-right",
        });
        refreshData(); // Verileri güncellemek için refreshData işlevini çağırın
      } else {
        toast.error("En az bir harf içeren bir adres girin.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Çalışan güncellenemedi: " + error.message, {
        position: "top-right",
      });
    }
  };

  const handlePhotoChange = async (file) => {
    try {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        toast.warning("Sadece jpg ve png dosyaları kabul edilir!");
        return;
      }

      const uploadedFileResponse = await uploadPhotoAndGetPath(file);
      const fileName = uploadedFileResponse.fileName;
      console.log("Dosya adı:", fileName);

      setPhotoPath(fileName);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

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
            <EmployeeUpdateCardLeftSide
              firstName={empData.firstName}
              secondName={empData.secondName}
              firstSurname={empData.firstSurname}
              secondSurname={empData.secondSurname}
              department={empData.department}
              imagePath={photoPath}
              onPhotoChange={handlePhotoChange}
            />
          )}
          {empData && (
            <EmployeePersonalUpdate
              firstName={empData.firstName}
              secondName={empData.secondName}
              firstSurname={empData.firstSurname}
              secondSurname={empData.secondSurname}
              email={empData.email}
              phoneNumber={phoneNumber}
              address={address}
              dateOfBirth={empData.dateOfBirth}
              birthPlace={empData.birthPlace}
              tc={empData.tc}
              onPhoneChange={(value) => setPhoneNumber(value)}
              onAddressChange={(e) => setAddress(e.target.value)}
            />
          )}
        </div>
        <div>
          <br />
          <button
            style={{ marginLeft: "264px" }}
            onClick={handleUpdateEmployee}
          >
            Kaydet
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />
    </>
  );
}

export default EmployeeUpdate;
