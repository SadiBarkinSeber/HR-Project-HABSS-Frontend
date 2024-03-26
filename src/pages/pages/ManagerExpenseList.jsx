import React, { useState, useEffect } from "react";
import { fetchAllExpenses } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { downloadFile } from "../api/api";
import { updateExpenseStatus } from "../api/api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";

function ManagerExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [sortDirection, setSortDirection] = useState({});
  const [filterOption, setFilterOption] = useState(""); // Harcama türü filtresi

  // fetchData fonksiyonu burada tanımlandı
  const fetchData = async () => {
    const data = await fetchAllExpenses();
    console.log(data);
    setExpenses(data);
    setSortedExpenses(data.reverse());
  };

  useEffect(() => {
    fetchData(); // useEffect içinde fetchData çağrıldı
  }, []);

  const handleDownload = async (fileName) => {
    const downloadResult = await downloadFile(fileName);
    if (downloadResult.success) {
      toast.success(downloadResult.message);
    } else {
      toast.error(downloadResult.message);
    }
  };

  const approveExpense = async (id) => {
    const updateResult = await updateExpenseStatus(id, true);
    if (updateResult.success) {
      toast.success(updateResult.message);
      fetchData(); // fetchData fonksiyonu burada çağrıldı
    } else {
      toast.error(updateResult.message);
    }
  };

  const rejectExpense = async (id) => {
    const updateResult = await updateExpenseStatus(id, false);
    if (updateResult.success) {
      toast.success(updateResult.message);
      fetchData(); // fetchData fonksiyonu burada çağrıldı
    } else {
      toast.error(updateResult.message);
    }
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("tr-TR");
  };

  const sortBy = (key) => {
    let direction = sortDirection[key] === "asc" ? "desc" : "asc";
    setSortDirection({ [key]: direction });

    const sorted = [...sortedExpenses].sort((a, b) => {
      if (key === "expenseType") {
        // Harcama türü kolonu için alfabetik sıralama yapılıyor
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        // Diğer kolonlar için varsayılan sıralama yapılıyor
        return direction === "asc"
          ? a[key] > b[key]
            ? 1
            : -1
          : a[key] < b[key]
          ? 1
          : -1;
      }
    });
    setSortedExpenses(sorted);
  };

  const filterExpenses = (expense) => {
    if (filterOption === "") {
      return true;
    } else {
      return expense.expenseType.toLowerCase() === filterOption.toLowerCase();
    }
  };

  const confirmApprove = (id) => {
    confirmAlert({
      title: "Onayla",
      message: "Bu harcama talebini onaylamak istediğinize emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () => approveExpense(id),
        },
        {
          label: "Hayır",
          onClick: () => {},
        },
      ],
    });
  };

  const confirmReject = (id) => {
    confirmAlert({
      title: "Reddet",
      message: "Bu harcama talebini reddetmek istediğinize emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () => rejectExpense(id),
        },
        {
          label: "Hayır",
          onClick: () => {},
        },
      ],
    });
  };

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
                  setSortedExpenses(
                    expenses.filter(
                      (expense) => expense.expenseType === selectedValue
                    )
                  );
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
                  <th onClick={() => sortBy("employeeName")}>
                    Çalışan Ad Soyad
                    {sortDirection["employeeName"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th onClick={() => sortBy("expenseType")}>
                    Harcama türü
                    {sortDirection["expenseType"] === "asc" ? (
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
                  <th onClick={() => sortBy("currency")}>
                    Miktar
                    {sortDirection["currency"] === "asc" ? (
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
                    <td>
                      {expense.employeeFirstName}
                      {expense.employeeSecondName}
                      {expense.employeeLastName}
                      {expense.employeeSecondLastName}
                    </td>
                    <td>{expense.expenseType}</td>
                    <td>{formatDate(expense.requestDate)}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.currency}</td>
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
                        className="btn btn-sm btn-success"
                        onClick={() => confirmApprove(expense.id)}
                      >
                        Onayla
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => confirmReject(expense.id)}
                      >
                        Reddet
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

export default ManagerExpenseList;
