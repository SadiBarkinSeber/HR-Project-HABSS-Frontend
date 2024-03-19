
import React, { useState, useEffect } from "react";
import { fetchAdvances } from "../api/api";

function AdvanceList() {
  const [advances, setAdvances] = useState([]);
  const [filterOption, setFilterOption] = useState("all"); // Varsayılan olarak tüm verileri göster

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAdvances();
      setAdvances(data);
    }

    fetchData();
  }, []);

  const handleCancel = (id) => {
    const isConfirmed = window.confirm("İşlemi iptal etmek istiyor musunuz?");
    if (isConfirmed) {
      const updatedAdvances = advances.filter((advance) => advance.id !== id);
      setAdvances(updatedAdvances);
    }
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("tr-TR");
  };

  const filterAdvances = (advance) => {
    if (filterOption === "all") {
      return true; // Tüm verileri göster
    } else if (filterOption === "individual") {
      return advance.advanceType === "Bireysel"; // Bireysel avansları göster
    } else if (filterOption === "corporate") {
      return advance.advanceType === "Kurumsal"; // Kurumsal avansları göster
    } else {
      return advance.permission === filterOption; // Diğer durumlarda izin durumuna göre filtrele
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="text-center mb-4">Avans Talebi Listesi</h1>
          <div className="table-responsive">
            <div className="mb-3">
              <label>Filtrele:</label>
              <select
                className="form-select"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
              >
                <option value="all">Hepsi</option>
                <option value="individual">Bireysel</option>
                <option value="corporate">Kurumsal</option>
                <option value="approved">Onaylı</option>
                <option value="rejected">Reddedilmiş</option>
                <option value="pending">Beklemede</option>
              </select>
            </div>
            <table className="table table-striped table-bordered table-hover">
              <thead className="bg-primary text-light">
                <tr>
                  <th>Avans Türü</th>
                  <th>Talep Tarihi</th>
                  <th>Açıklama</th>
                  <th>Miktar</th>
                  <th>Para Birimi</th>
                  <th>Onay Durumu</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {advances.filter(filterAdvances).map((advance) => (
                  <tr key={advance.id}>
                    <td>{advance.advanceType}</td>
                    <td>{formatDate(advance.requestDate)}</td>
                    <td>{advance.description}</td>
                    <td>{advance.amount}</td>
                    <td>{advance.currency}</td>
                    <td>{advance.permission}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancel(advance.id)}
                      >
                        İptal Et
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvanceList;
