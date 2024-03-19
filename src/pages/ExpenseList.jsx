
import React, { useState, useEffect } from "react";
import { fetchExpenses } from "./api/api";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filterOption, setFilterOption] = useState(""); // Harcama türü filtresi için state

  useEffect(() => {
    async function fetchData() {
      const data = await fetchExpenses();
      setExpenses(data);
    }

    fetchData();
  }, []);

  // Dosya indirme işlemi
  const handleDownload = async (fileName) => {
    try {
      // Dosya indirme işlemi burada yapılacak
      const response = await fetch(`/api/files/${fileName}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Dosya indirme hatası:", error);
    }
  };

  // İşlemi iptal etme fonksiyonu
  const cancelExpense = (id) => {
    const isConfirmed = window.confirm("İşlemi gerçekten iptal etmek istiyor musunuz?");
    if (isConfirmed) {
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      setExpenses(updatedExpenses);
      console.log("İptal edilen işlem ID:", id);
    }
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('tr-TR');
  };

  // Harcama türüne göre filtreleme işlevi
  const filterExpenses = (expense) => {
    if (filterOption === "") {
      return true; // Herhangi bir filtre seçilmediyse tüm verileri göster
    } else {
      return expense.type === filterOption; // Harcama türüne göre filtrele
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="text-center mb-4">Harcama Talebi Listesi</h1>
          <div className="table-responsive">
            <div className="mb-3">
              <label htmlFor="filterOption">Filtrele :</label>
              <select
                id="filterOption"
                className="form-select"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
              >
                <option value="">Hepsi</option>
                <option value="İş Seyahatleri">İş Seyahatleri</option>
                <option value="Ofis Malzemeleri">Ofis Malzemeleri</option>
                <option value="Eğitim ve Gelişim">Eğitim ve Gelişim</option>
                <option value="Reklam ve Pazarlama">Reklam ve Pazarlama</option>
                <option value="İş İlişkileri">İş İlişkileri</option>
                <option value="Personel Harcamaları">Personel Harcamaları</option>
              </select>
            </div>
            <table className="table table-striped table-bordered table-hover">
              <thead className="bg-primary text-light">
                <tr>
                  <th>Harcama türü</th>
                  <th>Talep Tarihi</th>
                  <th>Miktar</th>
                  <th>Onay Durumu</th>
                  <th>Döküman</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {expenses.filter(filterExpenses).map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.type}</td>
                    <td>{formatDate(expense.requestDate)}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.approvalStatus}</td>
                    <td className="text-center">
                      {expense.fileName && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleDownload(expense.fileName)}
                        >
                          İndir
                        </button>
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => cancelExpense(expense.id)}
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

export default ExpenseList;

