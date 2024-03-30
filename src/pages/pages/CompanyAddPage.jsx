
import React, { useState } from "react";
import { createCompany } from "../api/api";
import PhoneInput from "react-phone-number-input/input";

const CompanyAddPage = () => {
  const [companyData, setCompanyData] = useState({
    Name: "",
    title: "",
    mersisNo: "",
    taxNumber: "",
    taxDepartment: "",
    phoneNumber: "",
    address: "",
    email: "",
    employeeCount: "",
    foundingDate: "",
    dealStartDate: "",
    dealEndDate: "",
    logoImagePath: ""
  });
  const [photo, setPhoto] = useState(null);
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

      setCompanyData({ ...companyData, logoImagePath: fileName });
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Eğer gelen değer "employeeCount" alanına aitse ve bu değer negatif bir sayı ise, işlemi durdur
    if (name === "employeeCount" && parseInt(value) < 0) {
      return;
    }

    setCompanyData({ ...companyData, [name]: value });
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setPhoto(URL.createObjectURL(file)); // Fotoğrafı önizleme için URL oluştur
    handlePhotoChange(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Geçerli bir telefon numarası kontrolü
    if (companyData.phoneNumber.length !== 13) {
      alert("Lütfen geçerli bir telefon numarası giriniz.");
      return;
    }

   

    if (!validateAddress(companyData.address)) {
      alert("Adres en az bir harf ve bir rakam içermelidir.");
      return;
    }
    if (!validateMersisNo(companyData.mersisNo)) {
        alert("Girdiğiniz Mersis No sadece rakamlardan oluşmalı ve 16 hane uzunluğunda olmalıdır.");
        return;
      }
  
  

    if (!validateTaxNumber(companyData.taxNumber)) {
      alert("Girdiğiniz Vergi No sadece rakamlardan oluşmalı ve 10 hane uzunluğunda olmalıdır.");
      return;
    }

    if (!validateTaxDepartment(companyData.taxDepartment)) {
      alert("Vergi Dairesi boş bırakılamaz.");
      return;
    }

    // Sözleşme tarihlerinin kontrolü
    if (!validateContractDates(companyData.dealStartDate, companyData.dealEndDate)) {
      alert("Sözleşme başlangıç tarihi sözleşme bitiş tarihinden önce veya aynı olamaz.");
      return;
    }

    try {
      console.log(companyData);
      const confirmed = window.confirm("Kaydetmeyi onaylıyor musunuz?");
      if (confirmed) {
        const response = await createCompany(companyData);
        console.log("Company created:", response);
        resetForm();
        alert("Kayıt onaylandı.");
      } else {
        console.log("Kaydetme işlemi iptal edildi.");
      }
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const validateAddress = (address) => {
    // Adresin sadece rakam içerip içermediğini kontrol et
    return !/^\d+$/.test(address);
  };
  const validateMersisNo = (mersisNo) => {
    return mersisNo.length === 16 && /^\d+$/.test(mersisNo); // Mersis No'nun uzunluğunu ve rakamlardan oluştuğunu kontrol ediyoruz
  };
  const validateTaxNumber = (taxNumber) => {
    return taxNumber.length === 10 && /^\d+$/.test(taxNumber); // Vergi No'nun uzunluğunu ve rakamlardan oluştuğunu kontrol ediyoruz
  };
  

 
  const validateContractDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    return end >= today && start <= end;
  };

  const resetForm = () => {
    setCompanyData({
        Name: "",
      title: "",
      mersisNo: "",
      taxNumber: "",
      taxDepartment: "",
      phoneNumber: "",
      address: "",
      email: "",
      employeeCount: "",
      foundingDate: "",
      dealStartDate: "",
      dealEndDate: "",
   
      logoImagePath: ""
    });
    setPhoto(null);
    setFormSubmitted(false);
  };

  const validateForm = () => {
    // Tüm alanların dolu olup olmadığını kontrol et
    return Object.values(companyData).every((value) => value !== "");
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Şirket Ekle</h2>
      <div className="row justify-content-center align-items-start">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
            <div className="mb-3 d-flex align-items-center justify-content-center">
                <div className="me-3 text-center" style={{ width: "100px", height: "100px" }}>
                  <label htmlFor="photo" className="btn btn-primary rounded-circle upload-btn" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {photo ? <img src={photo} alt="Company" className="uploaded-photo" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "50%" }} /> : "+"}
                  </label>
                  <input type="file" id="photo" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                </div>
                <div>
                  <h5>Logo Yükleyiniz...</h5>
                 
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="Name">Ad:</label>
                <input type="text" id="Name" name="Name" value={companyData.Name} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !companyData.Name && (
                  <div className="text-danger">Adı boş bırakamazsınız.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="title">Ünvan:</label>
                <input type="text" id="title" name="title" value={companyData.title} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !companyData.title && (
                  <div className="text-danger">Ünvanı boş bırakamazsınız.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="mersisNo">Mersis No:</label>
                <input type="text" id="mersisNo" name="mersisNo" value={companyData.mersisNo} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !companyData.mersisNo && (
                  <div className="text-danger">Mersis No boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="taxNumber">Vergi No:</label>
                <input type="text" id="taxNumber" name="taxNumber" value={companyData.taxNumber} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !companyData.taxNumber && (
                  <div className="text-danger">Vergi No boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="taxDepartment">Vergi Dairesi:</label>
                <input type="text" id="taxDepartment" name="taxDepartment" value={companyData.taxDepartment} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !companyData.taxDepartment && (
                  <div className="text-danger">Vergi Dairesi boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber">Telefon Numarası:</label>
                <PhoneInput
                  country="TR"
                  value={companyData.phoneNumber}
                  onChange={(value) => setCompanyData({ ...companyData, phoneNumber: value })}
                  className="form-control mb-2"
                  maxLength={13}
                />
                {formSubmitted && !companyData.phoneNumber && (
                  <div className="text-danger">Telefon numarası boş bırakılamaz.</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="address">Adres:</label>
                <input type="text" id="address" name="address" value={companyData.address} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !companyData.address && (
                  <div className="text-danger">Adres boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={companyData.email} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !companyData.email && (
                  <div className="text-danger">Email boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="employeeCount">Çalışan Sayısı:</label>
                <input type="number" id="employeeCount" name="employeeCount" value={companyData.employeeCount} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !companyData.employeeCount && (
                  <div className="text-danger">Çalışan Sayısı bilgisi boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="foundingDate">Kuruluş Tarihi:</label>
                <input type="date" id="foundingDate" name="foundingDate" value={companyData.foundingDate} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !companyData.foundingDate && (
                  <div className="text-danger">Kuruluş Tarihi boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="dealStartDate">Sözleşme Başlangıç Tarihi:</label>
                <input type="date" id="dealStartDate" name="dealStartDate" value={companyData.dealStartDate} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !companyData.dealStartDate && (
                  <div className="text-danger">Sözleşme Başlangıç Tarihi boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="dealEndDate">Sözleşme Bitiş Tarihi:</label>
                <input type="date" id="dealEndDate" name="dealEndDate" value={companyData.dealEndDate} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !companyData.dealEndDate && (
                  <div className="text-danger">Sözleşme Bitiş Tarihi boş bırakılamaz.</div>
                )}
                {formSubmitted && companyData.dealStartDate && companyData.dealEndDate && new Date(companyData.dealStartDate) >= new Date(companyData.dealEndDate) && (
                  <div className="text-danger">Sözleşme Bitiş Tarihi, Sözleşme Başlangıç Tarihinden önce veya aynı olamaz.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <button type="submit" className="btn btn-primary me-2" onClick={handleSubmit}>Kaydet</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Vazgeç</button>
      </div>
    </div>
  );
};
export default CompanyAddPage;


