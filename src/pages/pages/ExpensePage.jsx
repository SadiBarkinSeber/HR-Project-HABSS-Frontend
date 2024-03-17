import React, { useState } from "react";
import { sendFormData } from "../api/api";
import { uploadPhotoAndGetPath } from "../api/api";

function Expense() {
  const [type, setType] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!type || !currency || !amount || !requestDate || !file) {
      alert("Lütfen tüm alanları doldurun ve bir dosya seçin.");
      return;
    }

    const uploadedFileResponse = await uploadPhotoAndGetPath(file);
    console.log(uploadedFileResponse);
    const fileName = uploadedFileResponse.fileName;

    const formData = {
      Type: type,
      Currency: currency,
      Amount: parseFloat(amount),
      RequestDate: requestDate,
      EmployeeId: 1,
      Permission: false,
      ApprovalStatus: "Requested",
      Response: "Başarılı",
      FileName: fileName,
    };

    try {
      const data = await sendFormData(formData);
      console.log("API yanıtı:", data);
      resetForm();
    } catch (error) {
      console.error("API isteği başarısız oldu:", error);
    }
  };

  const resetForm = () => {
    setType("");
    setCurrency("");
    setAmount("");
    setRequestDate("");
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert("Bugünden önceki bir tarih seçemezsiniz.");
      setRequestDate("");
    } else {
      setRequestDate(event.target.value);
    }
  };

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
                    Expense Type:
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Business Trips">Business Trips</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Training and Development">
                      Training and Development
                    </option>
                    <option value="Advertising and Marketing">
                      Advertising and Marketing
                    </option>
                    <option value="Business Relations">
                      Business Relations
                    </option>
                    <option value="Staff Expenses">Staff Expenses</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="currency" className="form-label">
                    Currency:
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    className="form-select"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="TRY">Turkish Lira (TRY)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="JPY">Japanese Yen (JPY)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="CHF">Swiss Franc (CHF)</option>
                    <option value="CAD">Canadian Dollar (CAD)</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount:
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="requestDate" className="form-label">
                    Request Date:
                  </label>
                  <input
                    type="date"
                    id="requestDate"
                    name="requestDate"
                    className="form-control"
                    value={requestDate}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formFileLg" className="form-label">
                    Choose File:
                  </label>
                  <input
                    className="form-control"
                    id="formFileLg"
                    type="file"
                    onChange={handleFileChange}
                  />
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
    </div>
  );
}

export default Expense;
