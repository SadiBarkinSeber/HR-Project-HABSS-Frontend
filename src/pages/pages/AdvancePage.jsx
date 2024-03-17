import React, { useState } from "react";
import { createAdvance } from "../api/api";

const Advance = () => {
  // State tanımlamaları
  const [advanceType, setAdvanceType] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // Avans türü seçenekleri
  const advanceTypeOptions = ["Bireysel", "Kurumsal"];

  // Para birimi seçenekleri
  const currencyOptions = ["TL", "USD", "EUR", "GBP"];

  // Form gönderme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
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

    // Formu sıfırla
    resetForm();
  };

  // Formu sıfırlama işlemi
  const resetForm = () => {
    setAdvanceType("");
    setCurrency("");
    setAmount("");
    setDescription("");
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
                    onChange={(e) => setAdvanceType(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Seçiniz</option>
                    {advanceTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="currency" className="form-label">
                    Para Birimi:
                  </label>
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Seçiniz</option>
                    {currencyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Tutar:
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Açıklama:
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                  />
                </div>
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
