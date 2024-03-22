import React, { useState } from "react";
import { sendFormData } from "../api/api";
import { uploadPhotoAndGetPath } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Expense() {
  const [type, setType] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!type || !currency || !amount || !file) {
      setErrorMessage("Lütfen tüm alanları doldurun ve bir dosya seçin.");
      return;
    }

    try {
      const uploadedFileResponse = await uploadPhotoAndGetPath(file);
      const fileName = uploadedFileResponse.fileName;

      const formData = {
        Type: type,
        Currency: currency,
        Amount: parseFloat(amount),
        EmployeeId: 1,
        Permission: false,
        ApprovalStatus: "Requested",
        Response: "Başarılı",
        FileName: fileName,
      };

      const data = await sendFormData(formData);
      console.log("API yanıtı:", data);
      notifySuccess();
      resetForm();
    } catch (error) {
      console.error("API isteği başarısız oldu:", error);
      notifyError();
    }
  };

  const resetForm = () => {
    setType("");
    setCurrency("");
    setAmount("");
    setFile(null);
    setErrorMessage("");
    setFormSubmitted(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage("");
  };

  const today = new Date().toISOString().split("T")[0];

  const notifySuccess = () =>
    toast.success("Harcama talebi başarıyla gönderildi!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const notifyError = () =>
    toast.error("Harcama talebi gönderimi sırasında bir hata oluştu!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title mb-4">Harcama Talebi Oluştur</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Harcama Türü:
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Seçiniz</option>
                    <option value="İş Seyahatleri">İş Seyahatleri</option>
                    <option value="Ofis Malzemeleri">Ofis Malzemeleri</option>
                    <option value=" Eğitim ve Gelişim">Eğitim ve Gelişim</option>
                    <option value="Reklam ve Pazarlama">Reklam ve Pazarlama</option>
                    <option value="İş İlişkileri">İş İlişkileri</option>
                    <option value="Personel Harcamaları">Personel Harcamaları</option>
                  </select>
                  {formSubmitted && !type && (
                    <div className="text-danger">
                      Lütfen harcama türünü seçin.
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="currency" className="form-label">
                    Para Birimi:
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    className="form-select"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="">Seçiniz</option>
                    <option value="TRY">TRY</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                  {formSubmitted && !currency && (
                    <div className="text-danger">
                      Lütfen para birimini seçin.
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Tutar:
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Miktar Giriniz"
                  />
                  {formSubmitted && !amount && (
                    <div className="text-danger">
                      Lütfen miktarı girin.
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="formFileLg" className="form-label">
                    Dosya Seç:
                  </label>
                  <input
                    className="form-control"
                    id="formFileLg"
                    type="file"
                    onChange={handleFileChange}
                  />
                  {formSubmitted && !file && (
                    <div className="text-danger">Lütfen dosya seçin.</div>
                  )}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary me-2">
                    Onaya Gönder
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Temizle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition="Bounce"
      />
    </div>
  );
}

export default Expense;
