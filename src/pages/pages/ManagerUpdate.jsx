import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchManager,
  updateManager,
  uploadPhotoAndGetPath
} from "../api/api";
import {
  EmployeeUpdateCardLeftSide,
  EmployeePersonalUpdate,
  EmployeeJobDetail,
} from "../../components/Cards";


function ManagerUpdate() {
  const [manager, setManager] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [photoPath, setPhotoPath] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchManager();
        setManager(data);
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
      // Adres alanında en az bir harf kontrolü
      if (/[a-zA-Z]/.test(address)) {
        const updatedMng = await updateManager(
          manager.id,
          phoneNumber,
          address,
          photoPath
        );
        console.log("Güncellenmiş Yönetici:", updatedMng);
        toast.success('Yönetici başarıyla güncellendi.', { position: "top-right" });
      } else {
        toast.error('En az bir harf içeren bir adres girin.', { position: "top-right" });
      }
    } catch (error) {
      console.error("Error updating manager:", error);
      toast.error('Yönetici güncellenemedi: ' + error.message, { position: "top-right" });
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

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
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
          {manager && (
            <EmployeeUpdateCardLeftSide
              firstName={manager.firstName}
              secondName={manager.secondName}
              firstSurname={manager.firstSurname}
              secondSurname={manager.secondSurname}
              department={manager.department}
              imagePath={photoPath}
              onPhotoChange={handlePhotoChange}
            />
          )}
          {manager && (
            <EmployeePersonalUpdate
              firstName={manager.firstName}
              secondName={manager.secondName}
              firstSurname={manager.firstSurname}
              secondSurname={manager.secondSurname}
              email={manager.email}
              phoneNumber={phoneNumber}
              address={address}
              dateOfBirth={manager.dateOfBirth}
              birthPlace={manager.birthPlace}
              tc={manager.tc}
              onPhoneChange={(value) => setPhoneNumber(value)}
              onAddressChange={handleAddressChange} // Adres değişikliğini yönetici
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

export default ManagerUpdate;
