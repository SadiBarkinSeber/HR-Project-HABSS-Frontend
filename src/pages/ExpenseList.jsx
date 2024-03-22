import React, { useState, useEffect } from "react";
import { fetchExpenses } from "./api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [sortDirection, setSortDirection] = useState({});
  const [filterOption, setFilterOption] = useState(""); // Harcama türü filtresi

  useEffect(() => {
    async function fetchData() {
      const data = await fetchExpenses();
      setExpenses(data);
      setSortedExpenses(data);
    }

    fetchData();
  }, []);

  const handleDownload = async (fileName) => {
    try {
      const response = await fetch(`/api/files/${fileName}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      toast.success("Dosya indirildi.");
    } catch (error) {
      console.error("Dosya indirme hatası:", error);
      toast.error("Dosya indirme sırasında bir hata oluştu.");
    }
  };

  const cancelExpense = (id) => {
    const isConfirmed = window.confirm("İşlemi gerçekten iptal etmek istiyor musunuz?");
    if (isConfirmed) {
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      setExpenses(updatedExpenses);
      console.log("İptal edilen işlem ID:", id);
      toast.success("İşlem iptal edildi.");
    }
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('tr-TR');
  };

  const sortBy = (key) => {
    let direction = sortDirection[key] === "asc" ? "desc" : "asc";
    setSortDirection({ [key]: direction });

    const sorted = [...sortedExpenses].sort((a, b) => {
      if (direction === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setSortedExpenses(sorted);
  };

  const filterExpenses = (expense) => {
    if (filterOption === "") {
      return true;
    } else {
      return expense.type === filterOption;
    }
  };

  const notify = (message) => toast(message);

  const notifyError = (message) => toast.error(message);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="text-center mb-4">Harcama Talebi Listesi</h1>
          <div className="mb-3">
            <label htmlFor="filterOption">Harcama Türü Seçiniz :</label>
            <select
              id="filterOption"
              className="form-select"
              value={filterOption}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setFilterOption(selectedValue);
                if (selectedValue === "") {
                  setSortedExpenses([...expenses]); // Tüm harcamaları göstermek için sıralı harcamaları tüm harcamalarla güncelle
                } else {
                  setSortedExpenses(expenses.filter(expense => expense.type === selectedValue));
                }
              }}
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
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="bg-primary text-light">
                <tr>
                  <th onClick={() => sortBy("type")}>
                    Harcama türü
                    {sortDirection["type"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th onClick={() => sortBy("requestDate")}>
                    Talep Tarihi
                    {sortDirection["requestDate"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th onClick={() => sortBy("amount")}>
                    Miktar
                    {sortDirection["amount"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th onClick={() => sortBy("approvalStatus")}>
                    Onay Durumu
                    {sortDirection["approvalStatus"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th>Döküman</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {sortedExpenses.filter(filterExpenses).map((expense) => (
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
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition="bounce"
      />
    </div>
  );
}

export default ExpenseList;

