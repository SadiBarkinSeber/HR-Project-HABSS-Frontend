
import React, { useState } from "react";
import { createAdvance } from "../api/api";
 
const Advance = () => {
  // State tanımlamaları
  const [advanceType, setAdvanceType] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); // Yeni state tanımı

  // Avans türü seçenekleri
  const advanceTypeOptions = ["Bireysel", "Kurumsal"];
 
  // Para birimi seçenekleri
  const currencyOptions = ["TL", "USD", "EUR"];
 
  // Form gönderme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true); // Formun gönderildiğini belirten bayrak

    // Kontroller
    if (!advanceType || !currency || !amount || !description) {
      setErrorMessage("Lütfen tüm alanları doldurunuz.");
      return;
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
    console.log(advanceObject);
 
    // Formu sıfırla ve hata mesajını temizle
    resetForm();
    setErrorMessage("");
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
      EmployeeId: 1,
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
                    Avans Türü:
                  </label>
                  <select
                    id="advanceType"
                    value={advanceType}
                    onChange={(e) => { setAdvanceType(e.target.value); clearErrorMessage(); }}
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
                    <div className="text-danger">Lütfen avans türü seçiniz.</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="currency" className="form-label">
                    Para Birimi:
                  </label>
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => { setCurrency(e.target.value); clearErrorMessage(); }}
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
                    <div className="text-danger">Lütfen para birimi seçiniz.</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Tutar:
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => { setAmount(e.target.value); clearErrorMessage(); }}
                    className="form-control"
                  />
                  {formSubmitted && !amount && (
                    <div className="text-danger">Lütfen avans tutarı giriniz.</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Açıklama:
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value); clearErrorMessage(); }}
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
    </div>
  );
};
 
export default Advance;
