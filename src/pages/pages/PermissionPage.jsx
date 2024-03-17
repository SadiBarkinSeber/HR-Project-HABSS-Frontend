import React, { useState } from "react";
import { createPermission, uploadPhotoAndGetPath } from "../api/api";

const Permission = () => {
  const [permissionType, setPermissionType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [file, setFile] = useState(null);

  const handlePermissionTypeChange = (e) => {
    setPermissionType(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
      handleClear();
    } catch (error) {
      console.error("İzin talebi oluşturulurken bir hata oluştu:", error);
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
                    <option value="izin1">İzin 1</option>
                    <option value="izin2">İzin 2</option>
                    <option value="izin3">İzin 3</option>
                  </select>
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
                    min={today}
                  />
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
                  />
                </div>
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
                </div>
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
    </div>
  );
};

export default Permission;
