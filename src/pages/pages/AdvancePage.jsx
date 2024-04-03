import React, { useState } from "react";
import { createAdvance } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEmp } from "../../components/EmployeeContext";
import { useNavigate } from "react-router-dom";

const Advance = () => {
  // State tanımlamaları
  const [advanceType, setAdvanceType] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); // Yeni state tanımı
  const { empData, setEmpData } = useEmp(); // Destructuring kullanarak empData ve setEmpData'ya erişin
  const navigate = useNavigate();

  // Avans türü seçenekleri
  const advanceTypeOptions = ["Bireysel", "Kurumsal"];

  // Para birimi seçenekleri
  const currencyOptions = ["TL", "USD", "EUR"];

  // Form gönderme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!advanceType || !currency || !amount || !description) {
      toast.warning("Lütfen tüm alanları doldurunuz.");
      return;
    }

    let limit = 0;
    if (advanceType === "Kurumsal") {
      // Kurumsal seçildiğinde harcama limiti kontrolü
      switch (currency) {
        case "TL":
          limit = 500000;
          break;
        case "USD":
          limit = 500000 / 32;
          break;
        case "EUR":
          limit = 500000 / 34;
          break;
        default:
          break;
      }
      if (parseInt(amount) > limit) {
        toast.warning(
          `Girilen avans miktarı kurumsal limiti aştı. Limit: ${limit.toFixed(
            2
          )} ${currency}`
        );
        return;
      }
    } else {
      if (currency === "TL" && parseInt(amount) > empData.wage * 3) {
        toast.warning("Girilen avans miktarı maaşın üç katından fazla olamaz.");
        return;
      } else if (
        currency === "USD" &&
        parseInt(amount) > (empData.wage * 3) / 32
      ) {
        toast.warning("Girilen avans miktarı maaşın üç katından fazla olamaz.");
        return;
      } else if (
        currency === "EUR" &&
        parseInt(amount) > (empData.wage * 3) / 34
      ) {
        toast.warning("Girilen avans miktarı maaşın üç katından fazla olamaz.");
        return;
      }
    }

    // Form verilerini işleme
    const advanceObject = createAdvanceObject(
      advanceType,
      currency,
      amount,
      description
    );
    const response = createAdvance(advanceObject);
    console.log(response);
    // Burada API'ye isteği göndermek yerine, senkron bir şekilde advanceObject'i işleme alabilirsiniz.
    console.log(advanceObject);
    // createAdvance(advanceObject);

    // Formu sıfırla ve hata mesajını temizle
    resetForm();
    setErrorMessage("");
    toast.success("Avans talebi başarıyla gönderildi.");
    setTimeout(() => {
      navigate("/emp-advance-list");
    }, 2000);
  };

  // Formu sıfırlama işlemi
  const resetForm = () => {
    setAdvanceType("");
    setCurrency("");
    setAmount("");
    setDescription("");
    setFormSubmitted(false); // Formun tekrar sıfırlandığını belirten bayrağı sıfırla
  };

  const createAdvanceObject = (advanceType, currency, amount, description) => {
    const advance = {
      AdvanceType: advanceType,
      Currency: currency,
      Amount: amount,
      Description: description,
      EmployeeId: empData.id,
      Permission: false,
      ApprovalStatus: "Requested",
    };
    return advance;
  };

  // Hata mesajlarını sıfırlama işlemi
  const clearErrorMessage = () => {
    setErrorMessage("");
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Avans Talebi Oluştur</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="advanceType" className="form-label">
                    <span style={{ color: "red" }}>*</span> Avans Türü:
                  </label>
                  <select
                    id="advanceType"
                    value={advanceType}
                    onChange={(e) => {
                      setAdvanceType(e.target.value);
                      clearErrorMessage();
                    }}
                    className="form-select"
                  >
                    <option value="">Seçiniz</option>
                    {advanceTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {formSubmitted && !advanceType && (
                    <div className="text-danger">
                      Lütfen avans türü seçiniz.
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="currency" className="form-label">
                    <span style={{ color: "red" }}>*</span> Para Birimi:
                  </label>
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                      clearErrorMessage();
                    }}
                    className="form-select"
                  >
                    <option value="">Seçiniz</option>
                    {currencyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {formSubmitted && !currency && (
                    <div className="text-danger">
                      Lütfen para birimi seçiniz.
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    <span style={{ color: "red" }}>*</span> Tutar:
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      clearErrorMessage();
                    }}
                    className="form-control"
                  />
                  {formSubmitted && !amount && (
                    <div className="text-danger">
                      Lütfen avans tutarı giriniz.
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    <span style={{ color: "red" }}>*</span> Açıklama:
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      clearErrorMessage();
                    }}
                    className="form-control"
                  />
                  {formSubmitted && !description && (
                    <div className="text-danger">Lütfen açıklama giriniz.</div>
                  )}
                </div>
                {errorMessage && (
                  <div className="text-danger mb-3">{errorMessage}</div>
                )}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary me-2">
                    Onaya Gönder
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-secondary"
                  >
                    Temizle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
};

export default Advance;
