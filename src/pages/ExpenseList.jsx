import React, { useState, useEffect } from "react";
import { fetchAllExpenses, updateExpenseStatusForEmployee } from "./api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { downloadFile } from "./api/api";
import { updateExpenseStatus } from "./api/api";
import { confirmAlert } from "react-confirm-alert";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useEmp } from "../components/EmployeeContext";
import Pagination from "react-bootstrap/Pagination";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [sortDirection, setSortDirection] = useState({});
  const [filterOption, setFilterOption] = useState(""); // Harcama türü filtresi
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(10);
  const { empData, refreshData } = useEmp();

  const employeeId = localStorage.getItem("empId");

  const fetchData = async () => {
    const data = await fetchAllExpenses(employeeId);
    setExpenses(data);
    setSortedExpenses(data.reverse());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownload = async (fileName) => {
    const downloadResult = await downloadFile(fileName);
    if (downloadResult.success) {
      toast.success(downloadResult.message);
    } else {
      toast.error(downloadResult.message);
    }
  };

  const rejectExpense = async (id) => {
    const updateResult = await updateExpenseStatusForEmployee(id, false);
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
      return expense.expenseType === filterOption;
    }
  };

  const isCancelEnabled = (approvalStatus) => {
    return approvalStatus === "Talep Edildi";
  };

  const confirmReject = (id) => {
    confirmAlert({
      title: "Harcama İptali",
      message: "Bu harcama talebini iptal etmek istediğinize emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () => {
            rejectExpense(id);
            toast.success("Harcama talebi başarıyla iptal edildi.");
          },
        },
        {
          label: "Hayır",
          onClick: () => {},
        },
      ],
    });
  };

  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = sortedExpenses
    .filter(filterExpenses)
    .slice(indexOfFirstExpense, indexOfLastExpense);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  setSortedExpenses([...expenses]);
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
                  <th
                    className="text-center"
                    onClick={() => sortBy("expenseType")}
                  >
                    Harcama türü
                    {sortDirection["expenseType"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th
                    className="text-center"
                    onClick={() => sortBy("requestDate")}
                  >
                    Talep Tarihi
                    {sortDirection["requestDate"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th className="text-center" onClick={() => sortBy("amount")}>
                    Miktar
                    {sortDirection["amount"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th
                    className="text-center"
                    onClick={() => sortBy("currency")}
                  >
                    Para Birimi
                    {sortDirection["currency"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th
                    className="text-center"
                    onClick={() => sortBy("approvalStatus")}
                  >
                    Onay Durumu
                    {sortDirection["approvalStatus"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th className="text-center">Döküman</th>
                  <th className="text-center">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {currentExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="text-center">{expense.expenseType}</td>
                    <td className="text-center">
                      {formatDate(expense.requestDate)}
                    </td>
                    <td className="text-center">{expense.amount}</td>
                    <td className="text-center">{expense.currency}</td>
                    <td className="text-center">{expense.approvalStatus}</td>
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
                        onClick={() => confirmReject(expense.id)}
                        disabled={!isCancelEnabled(expense.approvalStatus)}
                      >
                        İptal Et
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[
                ...Array(
                  Math.ceil(
                    sortedExpenses.filter(filterExpenses).length /
                      expensesPerPage
                  )
                ).keys(),
              ].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(
                    sortedExpenses.filter(filterExpenses).length /
                      expensesPerPage
                  )
                }
              />
            </Pagination>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}

export default ExpenseList;
