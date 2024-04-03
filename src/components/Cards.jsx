import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useProfilePicture } from "./ProfilePictureContext";
import Input from "react-phone-number-input/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EmployeeSumCard = (props) => {
  const { email, phoneNumber, address, routeDetailPage } = props;
  const navigateTo = useNavigate();

  const handleDetailButton = () => {
    navigateTo(routeDetailPage);
  };

  return (
    <>
      <div className={styles.employeeSumCard}>
        <div>
          <label htmlFor="">Mail :</label>{" "}
          <input
            className="form-control"
            type="text"
            placeholder="-"
            value={email}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="">Telefon :</label>
          <input
            className="form-control"
            type="text"
            placeholder="-"
            value={phoneNumber}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="">Adres :</label>
          <input
            className="form-control"
            type="text"
            placeholder="-"
            value={address}
            readOnly
          />
        </div>
      </div>
      <div>
        <button onClick={handleDetailButton}>Detay Bilgi</button>
      </div>
    </>
  );
};

export const EmployeeCardLeftSide = (props) => {
  const navigateTo = useNavigate();
  const { setProfilePictureData, profilePictureData } = useProfilePicture();

  const handleUpdateButton = () => {
    navigateTo(routeUpdatePage);
  };

  const {
    firstName,
    secondName,
    firstSurname,
    secondSurname,
    department,
    imagePath,
    routeUpdatePage,
  } = props;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://hrprojectwebapi20240311113118.azurewebsites.net/api/File/download?fileName=${props.imagePath}`,
          { responseType: "blob" }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        localStorage.setItem("profilePictureData", JSON.stringify(url));
        setProfilePictureData(url);
        
          
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, [props.imagePath, setProfilePictureData]);

  return (
    <div className={styles.leftCard}>
      <div className={styles.picture}>
        <img src={profilePictureData} alt="" />
      </div>
      <br />
      <div>
        {firstName} {secondName} {firstSurname} {secondSurname}
      </div>
      <div> {department}</div>
      <br />
      <button onClick={handleUpdateButton}>Profili Guncelle</button>
    </div>
  );
};

export const EmployeeUpdateCardLeftSide = (props) => {
  const { setProfilePictureData, profilePictureData } = useProfilePicture();

  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const imageUrl = URL.createObjectURL(file); // Dosya için önizleme URL'si oluştur
      setProfilePictureData(imageUrl); // Profil resmi verisini güncelle
      props.onPhotoChange(file);
      toast.success("Fotoğraf başarıyla yüklendi.");
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Fotoğraf yüklenirken bir hata oluştu.");
    }
  };

  const { firstName, secondName, firstSurname, secondSurname, department } =
    props;

  return (
    
    <div className={styles.leftCard}>
      <div className={`${styles.overlayText} font-italic`}>
          Fotoğrafı değiştirmek için fotoğrafın üzerine tıklayınız
        </div>
        <br />
      <div className={styles.picture} onClick={handleFileClick}>
        <img src={profilePictureData} alt="" />
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept="image/jpeg, image/png"
          style={{ display: "none" }}
        />
      </div>
      <br />
      
      <div>
        {firstName} {secondName} {firstSurname} {secondSurname}
      </div>
      <div> {department}</div>
    </div>
  );
};

export const EmployeePersonalDetail = (props) => {
  const {
    firstName,
    secondName,
    firstSurname,
    secondSurname,
    email,
    phoneNumber,
    address,
    dateOfBirth,
    birthPlace,
    tc,
  } = props;

  const fullName = [firstName, secondName, firstSurname, secondSurname]
    .filter((value) => value !== null && value !== undefined)
    .join(" ");

  return (
    <div className={styles.employeeCard}>
      <div>
        <label htmlFor="">Ad Soyad :</label>{" "}
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={fullName}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="">Mail :</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={email}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="">Telefon :</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={phoneNumber}
          readOnly
        />
      </div>

      <div>
        <label htmlFor="">Adres :</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={address}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="">Dogum Tarihi :</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={new Date(dateOfBirth).toLocaleDateString()}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="">Dogum Yeri :</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={birthPlace}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="">T.C:</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={tc}
          readOnly
        />
      </div>
    </div>
  );
};

export const EmployeeJobDetail = (props) => {
  const { startDate, endDate, isActive, position, department, company, wage } =
    props;

  return (
    <div className={styles.employeeCard}>
      <div>
        <label htmlFor="">Ise Giris Tarihi :</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={new Date(startDate).toLocaleDateString()}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="">Isten Cikis Tarihi :</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={endDate ?? "-"}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="">Aktiflik Durumu :</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={isActive}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="">Pozisyon :</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={position}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="">Departman :</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={department}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="">Sirket :</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={company}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="">Maas :</label>
        <input
          className="form-control"
          type="text"
          placeholder="-"
          value={wage}
          readOnly
        />
      </div>
    </div>
  );
};

export const EmployeePersonalUpdate = (props) => {
  const {
    firstName,
    secondName,
    firstSurname,
    secondSurname,
    email,
    phoneNumber,
    address,
    dateOfBirth,
    birthPlace,
    tc,
    onPhoneChange,
    onAddressChange,
  } = props;

  const fullName = [firstName, secondName, firstSurname, secondSurname]
    .filter((value) => value !== null && value !== undefined)
    .join(" ");

  return (
    <div className={styles.employeeCard}>
      <div>
        <label htmlFor="">Ad Soyad :</label>{" "}
        <input
          className="form-control text-secondary"
          type="text"
          placeholder="-"
          value={fullName}
          disabled
        />
      </div>
      <div>
        <label htmlFor="">Mail :</label>
        <input
          className="form-control text-secondary"
          type="text"
          placeholder="-"
          value={email}
          disabled
        />
      </div>
      <div>
        <label htmlFor="">Telefon :</label>
        <Input
          country="TR"
          international
          className="form-control border-success border-3"
          id="phone"
          value={phoneNumber}
          onChange={onPhoneChange}
          limitMaxLength={true} // Maksimum karakter sınırını etkinleştir
          maxLength={13}
        />
      </div>

      <div>
        <label htmlFor="">Adres :</label>{" "}
        <input
          className="form-control border-success border-3"
          type="text"
          id="address"
          value={address}
          onChange={onAddressChange}
        />
      </div>
      <div>
        <label htmlFor="">Dogum Tarihi :</label>
        <input
          className="form-control text-secondary"
          type="text"
          placeholder="-"
          value={new Date(dateOfBirth).toLocaleDateString()}
          disabled
        />
      </div>
      <div>
        <label htmlFor="">Dogum Yeri :</label>
        <input
          className="form-control text-secondary"
          type="text"
          placeholder="-"
          value={birthPlace}
          disabled
        />
      </div>
      <div>
        <label htmlFor="">T.C:</label>
        <input
          className="form-control text-secondary"
          type="text"
          placeholder="-"
          value={tc}
          disabled
        />
      </div>
    </div>
  );
};
