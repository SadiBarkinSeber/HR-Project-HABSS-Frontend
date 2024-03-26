import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchEmployees,
  updateEmployee,
  uploadPhotoAndGetPath,
} from "./api/api";

import {
  EmployeeUpdateCardLeftSide,
  EmployeePersonalUpdate,
  EmployeeJobDetail,
} from "../components/Cards";

import NavbarVertical from "../layouts/navbars/NavbarVertical";

function EmployeeUpdate() {
  const [employee, setEmployee] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [photoPath, setPhotoPath] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees();
        setEmployee(data);
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
        setPhotoPath(data.imagePath);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateEmployee = async () => {
    try {
      const updatedEmp = await updateEmployee(
        employee.id,
        phoneNumber,
        address,
        photoPath
      );
      console.log("Güncellenmiş Çalışan:", updatedEmp);
      toast.success("Çalışan başarıyla güncellendi.", {
        position: "top-right",
      });
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
        alert("Sadece jpg ve png dosyaları kabul edilir!");
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
          padding: "120px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {employee && (
            <EmployeeUpdateCardLeftSide
              firstName={employee.firstName}
              secondName={employee.secondName}
              firstSurname={employee.firstSurname}
              secondSurname={employee.secondSurname}
              department={employee.department}
              imagePath={photoPath}
              onPhotoChange={handlePhotoChange}
            />
          )}
          {employee && (
            <EmployeePersonalUpdate
              firstName={employee.firstName}
              secondName={employee.secondName}
              firstSurname={employee.firstSurname}
              secondSurname={employee.secondSurname}
              email={employee.email}
              phoneNumber={phoneNumber}
              address={address}
              dateOfBirth={employee.dateOfBirth}
              birthPlace={employee.birthPlace}
              tc={employee.tc}
              onPhoneChange={(value) => setPhoneNumber(value)}
              onAddressChange={(e) => setAddress(e.target.value)}
            />
          )}
          {employee && (
            <EmployeeJobDetail
              startDate={employee.startDate}
              endDate={employee.endDate}
              isActive={employee.isActive ? "Aktif" : "Pasif"}
              position={employee.position}
              department={employee.department}
              company={employee.company}
              wage={employee.wage + " TL"}
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
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition="Bounce"
        theme="colored"
      />
    </>
  );
}

export default EmployeeUpdate;
