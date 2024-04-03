import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateSiteManager, uploadPhotoAndGetPath } from "../api/api";
import {
  EmployeeUpdateCardLeftSide,
  EmployeePersonalUpdate,
} from "../../components/Cards";
import { useSiteMng } from "../../components/AdminContext";

function SiteManagerUpdate() {
  const { siteMngData, refreshData } = useSiteMng(); // Site yöneticisi verilerini al ve refreshData fonksiyonunu al

  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [photoPath, setPhotoPath] = useState("");

  useEffect(() => {
    if (siteMngData) {
      setPhoneNumber(siteMngData.phoneNumber);
      setAddress(siteMngData.address);
      setPhotoPath(siteMngData.imagePath);
    }
  }, [siteMngData]);

  const handleUpdateSiteManager = async () => {
    try {
      if (!phoneNumber) {
        toast.error("Telefon numarası boş bırakılamaz.", {
          position: "top-right",
        });
        return;
      }
      if (/[a-zA-Z]/.test(address)) {
        const updatedSiteManager = await updateSiteManager(
          siteMngData.id,
          phoneNumber,
          address,
          photoPath
        );
        console.log("Updated Site Manager:", updatedSiteManager);
        toast.success("Site Yöneticisi başarıyla güncellendi.", {
          position: "top-right",
        });
        refreshData(); // Verileri yenile
      } else {
        toast.error("Lütfen en az bir harf içeren bir adres girin.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating site manager:", error);
      toast.error("Site Yöneticisi güncellenemedi: " + error.message, {
        position: "top-right",
      });
    }
  };

  const handlePhotoChange = async (file) => {
    try {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        toast.error("Sadece jpg ve png formatında kabul edilir!", {
          position: "top-right",
        });
        return;
      }

      const uploadedFileResponse = await uploadPhotoAndGetPath(file);
      const fileName = uploadedFileResponse.fileName;
      console.log("File name:", fileName);

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
            <div style={{ textAlign: "center" }}>
              <EmployeeUpdateCardLeftSide
                firstName={siteMngData.firstName}
                secondName={siteMngData.secondName}
                firstSurname={siteMngData.firstSurname}
                secondSurname={siteMngData.secondSurname}
                department={siteMngData.department}
                imagePath={photoPath}
                onPhotoChange={handlePhotoChange}
              />
              <button
                style={{ marginTop: "20px" , marginRight:"120px"}}
                onClick={handleUpdateSiteManager}
              >
                Kaydet
              </button>
            </div>
          )}
          {siteMngData && (
            <EmployeePersonalUpdate
              firstName={siteMngData.firstName}
              secondName={siteMngData.secondName}
              firstSurname={siteMngData.firstSurname}
              secondSurname={siteMngData.secondSurname}
              email={siteMngData.email}
              phoneNumber={phoneNumber}
              address={address}
              dateOfBirth={siteMngData.dateOfBirth}
              birthPlace={siteMngData.birthPlace}
              tc={siteMngData.tc}
              onPhoneChange={(value) => setPhoneNumber(value)}
              onAddressChange={handleAddressChange}
            />
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}

export default SiteManagerUpdate;
