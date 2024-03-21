import React, { useState } from "react";
import { createEmployee } from "../api/api";
import PhoneInput from "react-phone-number-input/input";

const EmployeeCreate = () => {
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    secondName: "",
    lastName: "",
    secondSurname: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    birthPlace: "",
    tc: "", // TC kimlik numarası alanı eklendi
    address: "",
    company: "",
    position: "",
    startDate: "",
    wage: ""
  });

  const [photo, setPhoto] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (employeeData.phoneNumber.length !== 13) {
      alert("Lütfen geçerli bir telefon numarası giriniz.");
      return;
    }

    // TC kimlik numarası doğrulama işlemi
    const tcValidationResult = validateTcNumber(employeeData.tc);
    if (!tcValidationResult.valid) {
      alert(tcValidationResult.message);
      return;
    }

    // Diğer alanların kontrolü
    if (!validateForm()) {
      console.error("Lütfen tüm alanları doldurunuz.");
      return;
    }

    try {
      const response = await createEmployee(employeeData);
      console.log("Employee created:", response);
      resetForm();
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const validateForm = () => {
    for (const key in employeeData) {
      if (employeeData.hasOwnProperty(key) && key !== "secondName" && key !== "secondSurname") {
        if (!employeeData[key]) {
          return false;
        }
      }
    }
    return true;
  };

  const resetForm = () => {
    setEmployeeData({
      firstName: "",
      secondName: "",
      lastName: "",
      secondSurname: "",
      phoneNumber: "",
      birthDate: "",
      gender: "",
      birthPlace: "",
      tc: "",
      address: "",
      company: "",
      position: "",
      startDate: "",
      wage: ""
    });
    setPhoto(null);
    setFormSubmitted(false);
  };

  const validateTcNumber = (tc) => {
    if (!tc || tc.length !== 11 || isNaN(tc)) {
      return { valid: false, message: "Geçerli bir T.C. kimlik numarası giriniz...." };
    }
  
    const digits = Array.from(tc, Number);

    // Dizi elemanlarını ayır
    const [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11] = digits;

    // Kimlik numarasının doğruluğunu kontrol et
    const total = (t1 + t3 + t5 + t7 + t9) * 7 - (t2 + t4 + t6 + t8);
    const total2 = (t1+t2+t3+t4+t5+t6+t7+t8+t9+t10);
    if (total2 %10 !==t11 ||total % 10 !== t10 || (t1 === t2 && t2 === t3 && t3 === t4 && t4 === t5 && t5 === t6 && t6 === t7 && t7 === t8 && t8 === t9 && t9 === t10)) {
        return { valid: false, message: "Geçerli bir T.C. kimlik numarası giriniz." };
    }

    // Doğrulama başarılı ise true dön
    return { valid: true, message: "" };
};

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Çalışan Ekle</h2>
      <div className="row justify-content-center align-items-start">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="mb-3 d-flex align-items-center justify-content-center">
                <div className="me-3 text-center" style={{ width: "100px", height: "100px" }}>
                  <label htmlFor="photo" className="btn btn-primary rounded-circle upload-btn" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {photo ? <img src={photo} alt="Employee" className="uploaded-photo" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "50%" }} /> : "+"}
                  </label>
                  <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
                </div>
                <div>
                  <h5>Fotoğraf Seç</h5>
                  <p>Fotoğraf ekleyin veya değiştirin</p>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="firstName">Ad:</label>
                <input type="text" id="firstName" name="firstName" value={employeeData.firstName} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !employeeData.firstName && (
                  <div className="text-danger">Adı boş bırakamazsınız.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="secondName">İkinci Ad:</label>
                <input type="text" id="secondName" name="secondName" value={employeeData.secondName} onChange={handleInputChange} className="form-control mb-2" />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName">Soyad:</label>
                <input type="text" id="lastName" name="lastName" value={employeeData.lastName} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !employeeData.lastName && (
                  <div className="text-danger">Soyadı boş bırakamazsınız.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="secondSurname">İkinci Soyad:</label>
                <input type="text" id="secondSurname" name="secondSurname" value={employeeData.secondSurname} onChange={handleInputChange} className="form-control mb-2" />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber">Telefon Numarası:</label>
                <PhoneInput
                  country="TR"
                  value={employeeData.phoneNumber}
                  onChange={(value) => setEmployeeData({ ...employeeData, phoneNumber: value })}
                  className="form-control mb-2"
                  maxLength={13}
                />
                {formSubmitted && !employeeData.phoneNumber && (
                  <div className="text-danger">Telefon numarası boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="birthDate">Doğum Tarihi:</label>
                <input type="date" id="birthDate" name="birthDate" value={employeeData.birthDate} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !employeeData.birthDate && (
                  <div className="text-danger">Doğum tarihi boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label>Cinsiyet:</label>
                <div className="form-check">
                  <input type="radio" id="male" name="gender" value="male" checked={employeeData.gender === "male"} onChange={handleInputChange} className="form-check-input" />
                  <label htmlFor="male" className="form-check-label">Erkek</label>
                </div>
                <div className="form-check">
                  <input type="radio" id="female" name="gender" value="female" checked={employeeData.gender === "female"} onChange={handleInputChange} className="form-check-input" />
                  <label htmlFor="female" className="form-check-label">Kadın</label>
                </div>
                {formSubmitted && !employeeData.gender && (
                  <div className="text-danger">Cinsiyet seçimi yapmalısınız.</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="birthPlace">Doğum Yeri:</label>
                <input type="text" id="birthPlace" name="birthPlace" value={employeeData.birthPlace} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !employeeData.birthPlace && (
                  <div className="text-danger">Doğum yeri boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="tc">TC Kimlik No:</label>
                <input type="text" id="tc" name="tc" value={employeeData.tc} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !employeeData.tc && (
                  <div className="text-danger">TC kimlik numarası boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="address">Adres:</label>
                <input type="text" id="address" name="address" value={employeeData.address} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !employeeData.address && (
                  <div className="text-danger">Adres boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="company">Şirket Adı:</label>
                <input type="text" id="company" name="company" value={employeeData.company} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !employeeData.company && (
                  <div className="text-danger">Şirket adı boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="position">Pozisyon:</label>
                <input type="text" id="position" name="position" value={employeeData.position} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !employeeData.position && (
                  <div className="text-danger">Pozisyon boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="startDate">İşe Giriş Tarihi:</label>
                <input type="date" id="startDate" name="startDate" value={employeeData.startDate} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !employeeData.startDate && (
                  <div className="text-danger">İşe giriş tarihi boş bırakılamaz.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="wage">Maaş:</label>
                <input type="number" id="wage" name="wage" value={employeeData.wage} onChange={handleInputChange} className="form-control mb-2" />
                {formSubmitted && !employeeData.wage && (
                  <div className="text-danger">Maaş bilgisi boş bırakılamaz.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Kaydet</button>
      </div>
    </div>
  );
};

export default EmployeeCreate;
