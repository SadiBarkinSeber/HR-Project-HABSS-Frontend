import React, { useState } from "react";
import { createPermission, uploadPhotoAndGetPath } from "../api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Permission = () => {
  const [permissionType, setPermissionType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(false);

  const handlePermissionTypeChange = (e) => {
    setPermissionType(e.target.value);
    setShowFileUpload(e.target.value !== "Yıllık İzin");
    if (startDate) {
      if (e.target.value === "Yıllık İzin") {
        setNumberOfDays("");
        setFile(null);
      } else {
        calculateEndDate(e.target.value, startDate);
      }
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (permissionType) {
      if (permissionType !== "Yıllık İzin") {
        calculateEndDate(permissionType, e.target.value);
      }
    }
  };

  const calculateEndDate = (type, start) => {
    let days = 0;
    let end;
    const startDateObj = new Date(start);

    switch (type) {
      case "Baba İzni":
        days = 5;
        end = calculateEndExcludingWeekends(startDateObj, days);
        break;
      case "Anne İzni":
        days = 16 * 7; // 16 weeks
        end = calculateEndExcludingWeekends(startDateObj, days);
        break;
      case "Cenaze İzni":
        days = 3;
        end = calculateEndExcludingWeekends(startDateObj, days);
        break;
      case "Evlilik İzni":
        days = 3;
        end = calculateEndExcludingWeekends(startDateObj, days);
        break;
      default:
        break;
    }

    if (end) {
      setEndDate(end.toISOString().split("T")[0]);
      setNumberOfDays(days);
    }
  };

  const calculateEndExcludingWeekends = (startDate, days) => {
    let count = 0;
    let currentDate = new Date(startDate);
    
    while (count < days) {
      currentDate.setDate(currentDate.getDate() + 1);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        count++;
      }
    }

    return currentDate;
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    calculateNumberOfDays(startDate, e.target.value);
  };

  const calculateNumberOfDays = (start, end) => {
    const startDateTime = new Date(start).getTime();
    const endDateTime = new Date(end).getTime();
    let count = 0;

    for (let i = startDateTime; i <= endDateTime; i += 86400000) {
      const currentDate = new Date(i);
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
    }

    setNumberOfDays(count);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClear = () => {
    setPermissionType("");
    setStartDate("");
    setEndDate("");
    setNumberOfDays("");
    setFile(null);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!permissionType || !startDate || !endDate || !numberOfDays || (showFileUpload && !file)) {
      setErrorMessage("Lütfen tüm alanları doldurun ve bir dosya seçin.");
      return;
    }

    try {
      if (showFileUpload) {
        const uploadedFileResponse = await uploadPhotoAndGetPath(file);
        const fileName = uploadedFileResponse.fileName;
        const permissionData = {
          permissionType: permissionType,
          startDate: startDate,
          endDate: endDate,
          numberOfDays: numberOfDays,
          fileName: fileName,
          employeeId: 1,
        };

        const permissionResponse = await createPermission(permissionData);

        console.log("İzin talebi başarıyla oluşturuldu:", permissionResponse);

        toast.success('İzin talebi başarıyla oluşturuldu.', { position: "top-right" });
      } else {
        const permissionData = {
          permissionType: permissionType,
          startDate: startDate,
          endDate: endDate,
          numberOfDays: numberOfDays,
          employeeId: 1,
        };

        const permissionResponse = await createPermission(permissionData);

        console.log("İzin talebi başarıyla oluşturuldu:", permissionResponse);

        toast.success('İzin talebi başarıyla oluşturuldu.', { position: "top-right" });
      }
      handleClear();
    } catch (error) {
      console.error("İzin talebi oluşturulurken bir hata oluştu:", error);
      toast.error('İzin talebi oluşturulurken bir hata oluştu: ' + error.message, { position: "top-right" });
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">
                İzin Talebi Oluştur
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="permissionType" className="form-label">
                    İzin Türü:
                  </label>
                  <select
                    id="permissionType"
                    className="form-select"
                    value={permissionType}
                    onChange={handlePermissionTypeChange}
                  >
                    <option value="">Seçiniz</option>
                    <option value="Baba İzni">Baba İzni</option>
                    <option value="Anne İzni">Anne İzni</option>
                    <option value="Cenaze İzni">Cenaze İzni</option>
                    <option value="Yıllık İzin">Yıllık İzin</option>
                    <option value="Evlilik İzni">Evlilik İzni</option>
                  </select>
                  {errorMessage && !permissionType && (
                    <div className="text-danger">
                      Lütfen izin türünü seçin.
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    İzin Başlangıç Tarihi:
                  </label>
                  <input
                    type="date"
                    id="startDate"                    
                    className="form-control"
                    value={startDate}
                    onChange={handleStartDateChange}
                    min={today}
                  />
                  {errorMessage && !startDate && (
                    <div className="text-danger">
                      Lütfen başlangıç tarihini seçin.
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    İzin Bitiş Tarihi:
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    className="form-control"
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={startDate || today} // Minimum date is either start date or today
                  />
                  {errorMessage && !endDate && (
                    <div className="text-danger">
                      Lütfen bitiş tarihini seçin.
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="numberOfDays" className="form-label">
                    Gün Sayısı:
                  </label>
                  <input
                    type="number"
                    id="numberOfDays"
                    className="form-control"
                    value={numberOfDays}
                    onChange={(e) => setNumberOfDays(e.target.value)}
                    disabled={true}
                  />
                </div>
                {showFileUpload && (
                  <div className="mb-3">
                    <label htmlFor="file" className="form-label">
                      Dosya Yükle:
                    </label>
                    <input
                      type="file"
                      id="file"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    {errorMessage && !file && (
                      <div className="text-danger">Lütfen dosya seçin.</div>
                    )}
                  </div>
                )}

                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}

                <div className="text-center">
                  <button type="submit" className="btn btn-primary me-2">
                    Onaya Gönder
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClear}
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
        transition="Bounce"
        theme="colored"
      />
    </div>
  );
};

export default Permission;