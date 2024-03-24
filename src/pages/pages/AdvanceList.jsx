import React, { useState, useEffect } from "react";
import { fetchAdvances } from "../api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function AdvanceList() {
  const [advances, setAdvances] = useState([]);
  const [filterOption, setFilterOption] = useState("all"); 

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
      const updatedAdvances = advances.map((advance) => {
        if (advance.id === id) {
          toast.success("İşlem başarıyla iptal edildi");
          return { ...advance, permission: "İptal Edildi" };
        }
        return advance;
      });
      setAdvances(updatedAdvances);
    } else {
      toast.error("İşlem iptal edilmedi");
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

  const sortByAdvanceType = () => {
    const sorted = [...advances].sort((a, b) => a.advanceType.localeCompare(b.advanceType));
    setAdvances(sorted);
  };

  const sortByRequestDate = () => {
    const sorted = [...advances].sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate));
    setAdvances(sorted);
  };

  const sortByCurrency = () => {
    const sorted = [...advances].sort((a, b) => a.currency.localeCompare(b.currency));
    setAdvances(sorted);
  };

  const sortByAmount = () => {
    const sorted = [...advances].sort((a, b) => a.amount - b.amount);
    setAdvances(sorted);
  };

  const sortByApprovalStatus = () => {
    const sorted = [...advances].sort((a, b) => a.permission.localeCompare(b.permission));
    setAdvances(sorted);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="text-center mb-4">Avans Talebi Listesi</h1>
          <div className="table-responsive">
            <div className="mb-3">
              <label>Avans Türü Seçiniz:</label>
              <select
                className="form-select"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
              >
                <option value="all">Hepsi</option>
                <option value="individual">Bireysel</option>
                <option value="corporate">Kurumsal</option>
               
              </select>
            </div>
            <table className="table table-striped table-bordered table-hover">
              <thead className="bg-primary text-light">
                <tr>
                  <th onClick={sortByAdvanceType}>Avans Türü <span className="sort-icon">▼</span></th>
                  <th onClick={sortByRequestDate}>Talep Tarihi <span className="sort-icon">▼</span></th>
                  <th>Açıklama</th>
                  <th onClick={sortByAmount}>Miktar <span className="sort-icon">▼</span></th>
                  <th onClick={sortByCurrency}>Para Birimi <span className="sort-icon">▼</span></th>
                  <th onClick={sortByApprovalStatus}>Onay Durumu <span className="sort-icon">▼</span></th>
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
                      {advance.permission !== "İptal Edildi" ? (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleCancel(advance.id)}
                        >
                          İptal Et
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger disabled"
                          disabled
                        >
                          İptal Edildi
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      />
    </div>
  );
}

export default AdvanceList;
