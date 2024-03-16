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
      const fileName = uploadedFileResponse;
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
    <div>
      <h1>İzin Talebi Oluştur</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="permissionType">İzin Türü:</label>
          <select
            id="permissionType"
            value={permissionType}
            onChange={handlePermissionTypeChange}
          >
            <option value="">Seçiniz</option>
            <option value="izin1">İzin 1</option>
            <option value="izin2">İzin 2</option>
            <option value="izin3">İzin 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="startDate">İzin Başlangıç Tarihi:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            min={today}
          />
        </div>
        <div>
          <label htmlFor="endDate">İzin Bitiş Tarihi:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            min={today}
          />
        </div>
        <div>
          <label htmlFor="numberOfDays">Gün Sayısı:</label>
          <input
            type="number"
            id="numberOfDays"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="file">Dosya Yükle:</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <div>
          <button type="submit">Onaya Gönder</button>
          <button type="button" onClick={handleClear}>
            Temizle
          </button>
        </div>
      </form>
    </div>
  );
};

export default Permission;
