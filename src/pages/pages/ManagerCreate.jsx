import React, { useState } from "react";
import { createManager } from "../api/api";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input/input";
import { uploadPhotoAndGetPath } from "../api/api";
import { checkEmailExists } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchManagers } from "../api/api";

const ManagerCreate = () => {
  const navigate = useNavigate();
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
    isActive: true,
    department: "",
    email: "deneme@bilgeadam.com",
    imagePath: "",
    gender: "",
  });

  const [photo, setPhoto] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManagerData({ ...managerData, [name]: value });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setPhoto(URL.createObjectURL(file)); // Fotoğrafı önizleme için URL oluştur
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
      console.log("Dosya adı:", fileName);

      setManagerData({ ...managerData, imagePath: fileName });
      toast.success("Fotoğraf başarıyla yüklendi"); // Başarılı yükleme bildirimi
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Fotoğraf yüklenirken bir hata oluştu."); // Hata bildirimi
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Geçerli bir telefon numarası kontrolü
    if (managerData.phoneNumber.length !== 13) {
      toast.warning("Lütfen geçerli bir telefon numarası giriniz.");
      return;
    }

    // TC kimlik numarası doğrulama işlemi
    const tcValidationResult = validateTcNumber(managerData.tc);
    if (!tcValidationResult.valid) {
      toast.warning(tcValidationResult.message);
      return;
    }

    // Diğer alanların kontrolü
    if (!validateForm()) {
      toast.warning("Lütfen tüm alanları doldurunuz.");
      return;
    }

    if (!validateAddress(managerData.address)) {
      toast.warning("Adres en az bir harf ve bir rakam içermelidir.");
      return;
    }

    const minWage = 17002; // Asgari ücret tutarı
    if (parseInt(managerData.wage) < minWage) {
      toast.warning("Maaş asgari ücretin altında olamaz.");
      return;
    }

    try {
      // Yönetici listesini kontrol et
      const managersList = await fetchManagers(); // Bu fonksiyonun gerçek implementasyonunu kullanmalısınız
      const existingManager = managersList.find(
        (manager) =>
          manager.firstName === managerData.firstName &&
          manager.firstSurname === managerData.firstSurname
      );
      if (existingManager) {
        toast.warning("Bu isim ve soyisimde bir yönetici zaten mevcut.");
        return;
      }

      console.log(managerData);
      const confirmed = window.confirm("Kaydetmeyi onaylıyor musunuz?");
      if (confirmed) {
        const response = await createManager(managerData);
        console.log("Employee created:", response, response.email);
        checkEmailExists(response.email);
        resetForm();
        toast.success("Kayıt onaylandı.");
        navigate("/admin-manager-list");
      } else {
        console.log("Kaydetme işlemi iptal edildi.");
        toast.warning("Kaydetme işlemi iptal edildi.");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error("Kaydetme işlemi başarısız oldu.");
    }
  };

  const validateAddress = (address) => {
    // Adresin sadece rakam içerip içermediğini kontrol et
    return !/^\d+$/.test(address);
  };

  const validateForm = () => {
    for (const key in managerData) {
      if (
        managerData.hasOwnProperty(key) &&
        key !== "secondName" &&
        key !== "secondSurname"
      ) {
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
      DateOfBirth: "",
      birthPlace: "",
      tc: "",
      address: "",
      company: "",
      department: "",
      position: "",
      startDate: "",
      wage: "",
      isActive: true,
      email: "",
      imagepath: "",
      gender: "",
    });
    setPhoto(null);
    setFormSubmitted(false);
  };

  const validateTcNumber = (tc) => {
    if (!tc || tc.length !== 11 || isNaN(tc)) {
      return {
        valid: false,
        message: "Geçerli bir T.C. kimlik numarası giriniz....",
      };
    }

    const digits = Array.from(tc, Number);

    // T.C. kimlik numarasının doğruluğunu kontrol et
    const [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11] = digits;
    const total = (t1 + t3 + t5 + t7 + t9) * 7 - (t2 + t4 + t6 + t8);
    const total2 = t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8 + t9 + t10;
    if (
      total2 % 10 !== t11 ||
      total % 10 !== t10 ||
      (t1 === t2 &&
        t2 === t3 &&
        t3 === t4 &&
        t4 === t5 &&
        t5 === t6 &&
        t6 === t7 &&
        t7 === t8 &&
        t8 === t9 &&
        t9 === t10)
    ) {
      return {
        valid: false,
        message: "Geçerli bir T.C. kimlik numarası giriniz.",
      };
    }

    // Doğrulama başarılı ise true dön
    return { valid: true, message: "" };
  };

  const handleDateOfBirthChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];

    if (selectedDate > minDate) {
      toast.warning("Yaşınız 18'den küçük olamaz.");
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
                <div
                  className="me-3 text-center"
                  style={{ width: "100px", height: "100px" }}
                >
                  <label
                    htmlFor="photo"
                    className="btn btn-primary rounded-circle upload-btn"
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
                        alt="Employee"
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
                  <h5>Fotoğraf Seç</h5>
                  <p>
                    Fotoğraf ekleyin veya değiştirin{" "}
                    <span className="text-danger">*</span>
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="firstName">
                  Ad: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={managerData.firstName}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !managerData.firstName && (
                  <div className="text-danger">Adı boş bırakamazsınız.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="secondName">İkinci Ad:</label>
                <input
                  type="text"
                  id="secondName"
                  name="secondName"
                  value={managerData.secondName}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="firstSurname">
                  Soyad: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="firstSurname"
                  name="firstSurname"
                  value={managerData.firstSurname}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !managerData.firstSurname && (
                  <div className="text-danger">Soyadı boş bırakamazsınız.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="secondSurname">İkinci Soyad:</label>
                <input
                  type="text"
                  id="secondSurname"
                  name="secondSurname"
                  value={managerData.secondSurname}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber">
                  Telefon Numarası: <span className="text-danger">*</span>
                </label>
                <PhoneInput
                  country="TR"
                  value={managerData.phoneNumber}
                  onChange={(value) =>
                    setManagerData({ ...managerData, phoneNumber: value })
                  }
                  className="form-control mb-2"
                  maxLength={13}
                />
                {formSubmitted && !managerData.phoneNumber && (
                  <div className="text-danger">
                    Telefon numarası boş bırakılamaz.
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfBirth">
                  Doğum Tarihi: <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={managerData.dateOfBirth}
                  onChange={handleDateOfBirthChange}
                  className="form-control mb-2"
                  max={new Date().toISOString().split("T")[0]}
                />
                {formSubmitted && !managerData.dateOfBirth && (
                  <div className="text-danger">
                    Doğum tarihi boş bırakılamaz.
                  </div>
                )}
              </div>
              {
                <div className="mb-3">
                  <label>Cinsiyet:</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="Male"
                      checked={managerData.gender === "Male"}
                      onChange={handleInputChange}
                      className="form-check-input"
                    />
                    <label htmlFor="male" className="form-check-label">
                      Erkek
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="Female"
                      checked={managerData.gender === "Female"}
                      onChange={handleInputChange}
                      className="form-check-input"
                    />
                    <label htmlFor="female" className="form-check-label">
                      Kadın
                    </label>
                  </div>
                  {formSubmitted && !managerData.gender && (
                    <div className="text-danger">
                      Cinsiyet seçimi yapmalısınız.
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="birthPlace">
                  Doğum Yeri: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="birthPlace"
                  name="birthPlace"
                  value={managerData.birthPlace}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !managerData.birthPlace && (
                  <div className="text-danger">Doğum yeri boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="tc">
                  TC Kimlik No: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="tc"
                  name="tc"
                  value={managerData.tc}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !managerData.tc && (
                  <div className="text-danger">
                    TC kimlik numarası boş bırakılamaz.
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="address">
                  Adres: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={managerData.address}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !managerData.address && (
                  <div className="text-danger">Adres boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="company">
                  Şirket Adı: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={managerData.company}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !managerData.company && (
                  <div className="text-danger">Şirket adı boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="position">
                  Pozisyon: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={managerData.position}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !managerData.position && (
                  <div className="text-danger">Pozisyon boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="department">
                  Departman: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={managerData.department}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !managerData.department && (
                  <div className="text-danger">Departman boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="startDate">
                  İşe Giriş Tarihi: <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={managerData.startDate}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                  max={new Date().toISOString().split("T")[0]}
                />
                {formSubmitted && !managerData.startDate && (
                  <div className="text-danger">
                    İşe giriş tarihi boş bırakılamaz.
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="wage">
                  Maaş: <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  id="wage"
                  name="wage"
                  value={managerData.wage}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
                {formSubmitted && !managerData.wage && (
                  <div className="text-danger">
                    Maaş bilgisi boş bırakılamaz.
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
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Kaydet
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
};

export default ManagerCreate;
