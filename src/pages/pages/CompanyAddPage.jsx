import React, { useState } from "react";
import { createCompany } from "../api/api";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CompanyAddPage = () => {
  const navigate = useNavigate();
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
    logoImagePath: "",
  });
  const [photo, setPhoto] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const uploadPhotoAndGetPath = async (file) => {
    try {
      const response = await fetch("upload-url", {
        method: "POST",
        body: file,
      });
      toast.success("Fotoğraf başarıyla yüklendi");
      const data = await response.json();
      return data.path; // Dosyanın yolu
    } catch (error) {
      throw new Error("Fotoğraf yüklenirken bir hata oluştu.");
    }
  };

  const validateTaxDepartment = (taxDepartment) => {
    return taxDepartment.trim() !== "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "employeeCount" && parseInt(value) < 0) {
      return;
    }
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setPhoto(URL.createObjectURL(file));
    handlePhotoChange(file);
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
      setCompanyData({ ...companyData, logoImagePath: fileName });
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!photo) {
      toast.warning("Lütfen bir logo yükleyin.");
      return;
    }

    confirmAlert({
      title: "Onaylama",
      message: "Kaydetmeyi onaylıyor musunuz?",
      buttons: [
        {
          label: "Evet",
          onClick: async () => {
            try {
              const response = await createCompany(companyData);
              console.log("Company created:", response);
              resetForm();
              toast.success("Şirket başarıyla kaydedildi.");
              setTimeout(() => {
                navigate("/admin-company-list");
              }, 2000);
            } catch (error) {
              console.error("Error creating company:", error);
              toast.error(
                "Şirket Kaydı onaylanırken bir sorun ile karşılaşıldı."
              );
            }
          },
        },
        {
          label: "Hayır",
          onClick: () => console.log("Kaydetme işlemi iptal edildi."),
        },
      ],
    });
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
      logoImagePath: "",
    });
    setPhoto(null);
    setFormSubmitted(false);
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
                <div
                  className="me-3 text-center"
                  style={{ width: "100px", height: "100px" }}
                >
                  <label
                    htmlFor="photo"
                    className="btn btn-light rounded-circle upload-btn"
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {photo ? (
                      <img
                        src={photo}
                        alt="Company"
                        className="uploaded-photo"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      "+"
                    )}
                  </label>
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div>
                  <h5>
                    Logo Yükleyiniz...<span className="text-danger">*</span>
                  </h5>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="Name">
                  <span style={{ color: "red" }}>*</span> Ad:
                </label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={companyData.Name}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !companyData.Name && (
                  <div className="text-danger">Adı boş bırakamazsınız.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="title">
                  <span style={{ color: "red" }}>*</span> Ünvan:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={companyData.title}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !companyData.title && (
                  <div className="text-danger">Ünvanı boş bırakamazsınız.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="mersisNo">
                  <span style={{ color: "red" }}>*</span> Mersis No:
                </label>
                <input
                  type="text"
                  id="mersisNo"
                  name="mersisNo"
                  value={companyData.mersisNo}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !companyData.mersisNo && (
                  <div className="text-danger">Mersis No boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="taxNumber">
                  <span style={{ color: "red" }}>*</span> Vergi No:
                </label>
                <input
                  type="text"
                  id="taxNumber"
                  name="taxNumber"
                  value={companyData.taxNumber}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !companyData.taxNumber && (
                  <div className="text-danger">Vergi No boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="taxDepartment">
                  <span style={{ color: "red" }}>*</span> Vergi Dairesi:
                </label>
                <input
                  type="text"
                  id="taxDepartment"
                  name="taxDepartment"
                  value={companyData.taxDepartment}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !companyData.taxDepartment && (
                  <div className="text-danger">
                    Vergi Dairesi boş bırakılamaz.
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber">
                  <span style={{ color: "red" }}>*</span> Telefon Numarası:
                </label>
                <PhoneInput
                  country="TR"
                  value={companyData.phoneNumber}
                  onChange={(value) =>
                    setCompanyData({ ...companyData, phoneNumber: value })
                  }
                  className="form-control mb-2"
                  maxLength={13}
                />
                {formSubmitted && !companyData.phoneNumber && (
                  <div className="text-danger">
                    Telefon numarası boş bırakılamaz.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="address">
                  <span style={{ color: "red" }}>*</span> Adres:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={companyData.address}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !companyData.address && (
                  <div className="text-danger">Adres boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  <span style={{ color: "red" }}>*</span> Email:{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={companyData.email}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !companyData.email && (
                  <div className="text-danger">Email boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="employeeCount">
                  <span style={{ color: "red" }}>*</span> Çalışan Sayısı:{" "}
                </label>
                <input
                  type="number"
                  id="employeeCount"
                  name="employeeCount"
                  value={companyData.employeeCount}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !companyData.employeeCount && (
                  <div className="text-danger">
                    Çalışan Sayısı bilgisi boş bırakılamaz.
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="foundingDate">
                  <span style={{ color: "red" }}>*</span> Kuruluş Tarihi:{" "}
                </label>

                <input
                  type="date"
                  id="foundingDate"
                  name="foundingDate"
                  value={companyData.foundingDate}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                  max={
                    new Date().getFullYear() +
                    "-" +
                    ("0" + (new Date().getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + new Date().getDate()).slice(-2)
                  }
                />

                {formSubmitted && !companyData.foundingDate && (
                  <div className="text-danger">
                    Kuruluş Tarihi boş bırakılamaz.
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="dealStartDate">
                  <span style={{ color: "red" }}>*</span> Sözleşme Başlangıç
                  Tarihi:{" "}
                </label>
                <input
                  type="date"
                  id="dealStartDate"
                  name="dealStartDate"
                  value={companyData.dealStartDate}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !companyData.dealStartDate && (
                  <div className="text-danger">
                    Sözleşme Başlangıç Tarihi boş bırakılamaz.
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="dealEndDate">
                  <span style={{ color: "red" }}>*</span> Sözleşme Bitiş Tarihi:{" "}
                </label>
                <input
                  type="date"
                  id="dealEndDate"
                  name="dealEndDate"
                  value={companyData.dealEndDate}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !companyData.dealEndDate && (
                  <div className="text-danger">
                    Sözleşme Bitiş Tarihi boş bırakılamaz.
                  </div>
                )}
                {formSubmitted &&
                  companyData.dealStartDate &&
                  companyData.dealEndDate &&
                  new Date(companyData.dealStartDate) >=
                    new Date(companyData.dealEndDate) && (
                    <div className="text-danger">
                      Sözleşme Bitiş Tarihi, Sözleşme Başlangıç Tarihinden önce
                      veya aynı olamaz.
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <button
          type="submit"
          className="btn btn-primary me-2"
          onClick={handleSubmit}
        >
          Kaydet
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Vazgeç
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
};
export default CompanyAddPage;
