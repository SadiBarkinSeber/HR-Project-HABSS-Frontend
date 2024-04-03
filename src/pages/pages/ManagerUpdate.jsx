import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMng } from "../../components/ManagerContext";
import { updateManager, uploadPhotoAndGetPath } from "../api/api";
import {
  EmployeeUpdateCardLeftSide,
  EmployeePersonalUpdate,
} from "../../components/Cards";

function ManagerUpdate() {
  const { mngData, refreshData } = useMng();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [photoPath, setPhotoPath] = useState("");

  useEffect(() => {
    if (mngData) {
      setPhoneNumber(mngData.phoneNumber);
      setAddress(mngData.address);
      setPhotoPath(mngData.imagePath);
    }
  }, [mngData]);

  const handleUpdateEmployee = async () => {
    try {
      if (!phoneNumber) {
        toast.error("Telefon numarası boş bırakılamaz.", {
          position: "top-right",
        });
        return;
      }
      // Adres alanında en az bir harf kontrolü
      if (/[a-zA-Z]/.test(address)) {
        const updatedMng = await updateManager(
          mngData.id,
          phoneNumber,
          address,
          photoPath
        );
        console.log("Güncellenmiş Yönetici:", updatedMng);
        toast.success("Yönetici başarıyla güncellendi.", {
          position: "top-right",
        });
        refreshData(); // Veriyi yenile
      } else {
        toast.error("En az bir harf içeren bir adres girin.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating manager:", error);
      toast.error("Yönetici güncellenemedi: " + error.message, {
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
          {mngData && (
            <div style={{ textAlign: "center" }}>
              <EmployeeUpdateCardLeftSide
                firstName={mngData.firstName}
                secondName={mngData.secondName}
                firstSurname={mngData.firstSurname}
                secondSurname={mngData.secondSurname}
                department={mngData.department}
                imagePath={photoPath}
                onPhotoChange={handlePhotoChange}
              />
              <button
                style={{ marginTop: "20px" , marginRight:"120px" }}
                onClick={handleUpdateEmployee}
              >
                Kaydet
              </button>
            </div>
          )}
          {mngData && (
            <EmployeePersonalUpdate
              firstName={mngData.firstName}
              secondName={mngData.secondName}
              firstSurname={mngData.firstSurname}
              secondSurname={mngData.secondSurname}
              email={mngData.email}
              phoneNumber={phoneNumber}
              address={address}
              dateOfBirth={mngData.dateOfBirth}
              birthPlace={mngData.birthPlace}
              tc={mngData.tc}
              onPhoneChange={(value) => setPhoneNumber(value)}
              onAddressChange={handleAddressChange}
            />
          )}
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

export default ManagerUpdate;
