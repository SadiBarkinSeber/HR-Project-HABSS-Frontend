import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchSiteManagers, updateSiteManager, uploadPhotoAndGetPath } from "../api/api";
import {
  EmployeeUpdateCardLeftSide,
  EmployeePersonalUpdate,
  EmployeeJobDetail,
} from "../../components/Cards";

function SiteManagerUpdate() {
  const [siteManager, setSiteManager] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [photoPath, setPhotoPath] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSiteManagers();
        setSiteManager(data);
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
        setPhotoPath(data.imagePath);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateSiteManager = async () => {
    try {
      if (/[a-zA-Z]/.test(address)) {
        const updatedSiteManager = await updateSiteManager(
          siteManager.id,
          phoneNumber,
          address,
          photoPath
        );
        console.log("Updated Site Manager:", updatedSiteManager);
        toast.success("Site Yöneticisi başarıyla güncellendi.", {
          position: "top-right",
        });
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
          {siteManager && (
            <EmployeeUpdateCardLeftSide
              firstName={siteManager.firstName}
              secondName={siteManager.secondName}
              firstSurname={siteManager.firstSurname}
              secondSurname={siteManager.secondSurname}
              department={siteManager.department}
              imagePath={photoPath}
              onPhotoChange={handlePhotoChange}
            />
          )}
          {siteManager && (
            <EmployeePersonalUpdate
              firstName={siteManager.firstName}
              secondName={siteManager.secondName}
              firstSurname={siteManager.firstSurname}
              secondSurname={siteManager.secondSurname}
              email={siteManager.email}
              phoneNumber={phoneNumber}
              address={address}
              dateOfBirth={siteManager.dateOfBirth}
              birthPlace={siteManager.birthPlace}
              tc={siteManager.tc}
              onPhoneChange={(value) => setPhoneNumber(value)}
              onAddressChange={handleAddressChange}
            />
          )}
        </div>
        <div>
          <br />
          <button
            style={{ marginLeft: "264px" }}
            onClick={handleUpdateSiteManager}
          >
            Save
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

export default SiteManagerUpdate;
