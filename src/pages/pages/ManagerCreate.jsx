import React, { useState } from "react";
import { createManager } from "../api/api";
import PhoneInput from "react-phone-number-input/input";
import { uploadPhotoAndGetPath } from "../api/api";

const ManagerCreate = () => {
  const [managerData, setManagerData] = useState({
    firstName: "",
    secondName: "",
    firstSurname: "",
    secondSurname: "",
    phoneNumber: "",
    dateOfBirth: "",
    birthPlace: "",
    tc: "",
    address: "",
    company: "",
    position: "",
    startDate: "",
    wage: "",
    department: "",
    email: "deneme@bilgeadam.com",
    imagePath: ""
    

  });

  const [photo, setPhoto] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManagerData({ ...managerData, [name]: value });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setPhoto(URL.createObjectURL(file));
    handlePhotoChange(file);
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

      setManagerData({ ...managerData, imagePath: fileName });
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Validations
    if (managerData.phoneNumber.length !== 13) {
      alert("Lütfen geçerli bir telefon numarası giriniz.");
      return;
    }

    const tcValidationResult = validateTcNumber(managerData.tc);
    if (!tcValidationResult.valid) {
      alert(tcValidationResult.message);
      return;
    }

    if (!validateForm()) {
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }

    if (!validateAddress(managerData.address)) {
      alert("Adres en az bir harf ve bir rakam içermelidir.");
      return;
    }

    const minWage = 17002; // Asgari ücret tutarı
    if (parseInt(managerData.wage) < minWage) {
      alert("Maaş asgari ücretin altında olamaz.");
      return;
    }

    try {
      const confirmed = window.confirm("Kaydetmeyi onaylıyor musunuz?");
      if (confirmed) {
        console.log(managerData);
        const response = await createManager(managerData);
        console.log("Manager created:", response);
        resetForm();
        alert("Kayıt onaylandı.");
      } else {
        console.log("Kaydetme işlemi iptal edildi.");
      }
    } catch (error) {
      console.error("Error creating manager:", error);
    }
  };

  const validateAddress = (address) => {
    return !/^\d+$/.test(address);
  };

  const validateForm = () => {
    for (const key in managerData) {
      if (managerData.hasOwnProperty(key) && key !== "secondName" && key !== "secondSurname") {
        if (!managerData[key]) {
          return false;
        }
      }
    }
    return true;
  };

  const resetForm = () => {
    setManagerData({
      firstName: "",
      secondName: "",
      firstSurname: "",
      secondSurname: "",
      phoneNumber: "",
      dateOfBirth: "",
      birthPlace: "",
      tc: "",
      address: "",
      company: "",
      department: "",
      position: "",
      startDate: "",
      wage: "",
      email: "",
      imagePath: "",
      
     
    });
    setPhoto(null);
    setFormSubmitted(false);
  };

  const validateTcNumber = (tc) => {
    if (!tc || tc.length !== 11 || isNaN(tc)) {
      return { valid: false, message: "Geçerli bir T.C. kimlik numarası giriniz." };
    }

    const digits = Array.from(tc, Number);

    const [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11] = digits;
    const total = (t1 + t3 + t5 + t7 + t9) * 7 - (t2 + t4 + t6 + t8);
    const total2 = t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8 + t9 + t10;
    if (total2 % 10 !== t11 || total % 10 !== t10 || (t1 === t2 && t2 === t3 && t3 === t4 && t4 === t5 && t5 === t6 && t6 === t7 && t7 === t8 && t8 === t9 && t9 === t10)) {
      return { valid: false, message: "Geçerli bir T.C. kimlik numarası giriniz." };
    }

    return { valid: true, message: "" };
  };

  const handleDateOfBirthChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    
    if (selectedDate > minDate) {
      alert("Yaşınız 18'den küçük olamaz.");
      return;
    }
    
    setManagerData({ ...managerData, dateOfBirth: selectedDate });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Yönetici Ekle</h2>
      <div className="row justify-content-center align-items-start">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="mb-3 d-flex align-items-center justify-content-center">
                <div className="me-3 text-center" style={{ width: "100px", height: "100px" }}>
                  <label htmlFor="photo" className="btn btn-primary rounded-circle upload-btn" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {photo ? <img src={photo} alt="Manager" className="uploaded-photo" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "50%" }} /> : "+"}
                  </label>
                  <input type="file" id="photo" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                </div>
                <div>
                  <h5>Fotoğraf Seç</h5>
                  <p>Fotoğraf ekleyin veya değiştirin</p>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="firstName">Ad:</label>
                <input type="text" id="firstName" name="firstName" value={managerData.firstName} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !managerData.firstName && (
                  <div className="text-danger">Adı boş bırakamazsınız.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="secondName">İkinci Ad:</label>
                <input type="text" id="secondName" name="secondName" value={managerData.secondName} onChange={handleInputChange} className="form-control mb-2" />
              </div>
              <div className="mb-3">
                <label htmlFor="firstSurname">Soyad:</label>
                <input type="text" id="firstSurname" name="firstSurname" value={managerData.firstSurname} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !managerData.firstSurname && (
                  <div className="text-danger">Soyadı boş bırakamazsınız.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="secondSurname">İkinci Soyad:</label>
                <input type="text" id="secondSurname" name="secondSurname" value={managerData.secondSurname} onChange={handleInputChange} className="form-control mb-2" />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber">Telefon Numarası:</label>
                <PhoneInput
                  country="TR"
                  value={managerData.phoneNumber}
                  onChange={(value) => setManagerData({ ...managerData, phoneNumber: value })}
                  className="form-control mb-2"
                  maxLength={13}
                />
                {formSubmitted && !managerData.phoneNumber && (
                  <div className="text-danger">Telefon numarası boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfBirth">Doğum Tarihi:</label>
                <input 
                  type="date" 
                  id="dateOfBirth" 
                  name="dateOfBirth" 
                  value={managerData.dateOfBirth} 
                  onChange={handleDateOfBirthChange} 
                  className="form-control mb-2" 
                  max={new Date().toISOString().split('T')[0]} 
                />
                {formSubmitted && !managerData.dateOfBirth && (
                  <div className="text-danger">Doğum tarihi boş bırakılamaz.</div>
                )}
              </div>
              
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="birthPlace">Doğum Yeri:</label>
                <input type="text" id="birthPlace" name="birthPlace" value={managerData.birthPlace} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !managerData.birthPlace && (
                  <div className="text-danger">Doğum yeri boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="tc">TC Kimlik No:</label>
                <input type="text" id="tc" name="tc" value={managerData.tc} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !managerData.tc && (
                  <div className="text-danger">TC kimlik numarası boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="address">Adres:</label>
                <input type="text" id="address" name="address" value={managerData.address} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !managerData.address && (
                  <div className="text-danger">Adres boş bırakılamaz.</div>
                )}
              </div>
                <label htmlFor="company">Şirket Adı:</label>
                <input type="text" id="company" name="company" value={managerData.company} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !managerData.company && (
                  <div className="text-danger">Şirket adı boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="position">Pozisyon:</label>
                <input type="text" id="position" name="position" value={managerData.position} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !managerData.position && (
                  <div className="text-danger">Pozisyon boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="department">Departman:</label>
                <input type="text" id="department" name="department" value={managerData.department} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !managerData.department && (
                  <div className="text-danger">Departman boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="startDate">İşe Giriş Tarihi:</label>
                <input type="date" id="startDate" name="startDate" value={managerData.startDate} onChange={handleInputChange} className="form-control mb-2" max={new Date().toISOString().split('T')[0]} />
                {formSubmitted && !managerData.startDate && (
                  <div className="text-danger">İşe giriş tarihi boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="wage">Maaş:</label>
                <input type="number" id="wage" name="wage" value={managerData.wage} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !managerData.wage && (
                  <div className="text-danger">Maaş bilgisi boş bırakılamaz.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={handleSubmit}>Kaydet</button>
        <button className="btn btn-secondary ms-2" onClick={resetForm}>Temizle</button>
      </div>
    </div>
  );
};

export default ManagerCreate;
