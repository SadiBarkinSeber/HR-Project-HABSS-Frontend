import React, { useState, useEffect } from "react";
import { fetchAllExpenseList } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { downloadFile } from "../api/api";
import { updateExpenseStatus } from "../api/api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-bootstrap/Pagination";

function ManagerExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [sortDirection, setSortDirection] = useState({});
  const [filterOption, setFilterOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(10);

  const fetchData = async () => {
    const data = await fetchAllExpenseList();
    console.log(data);
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

  const approveExpense = async (id) => {
    const updateResult = await updateExpenseStatus(id, true);
    if (updateResult.success) {
      toast.success(updateResult.message);
      fetchData();
    } else {
      toast.error(updateResult.message);
    }
  };

  const rejectExpense = async (id) => {
    const updateResult = await updateExpenseStatus(id, false);
    if (updateResult.success) {
      toast.success(updateResult.message);
      fetchData();
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
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
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

  const isActionEnabled = (approvalStatus) => {
    return approvalStatus === "Talep Edildi";
  };

  const confirmApprove = (id) => {
    confirmAlert({
      title: "Onayla",
      message: "Bu harcama talebini onaylamak istediğinize emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () => {
            approveExpense(id);
            toast.success("İzin talebi onaylandı.");
          },
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
          onClick: () => {
            rejectExpense(id);
            toast.error("İzin talebi reddedildi.");
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
        <div className="col-md-15">
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
                    className="text-center text-nowrap"
                    onClick={() => sortBy("employeeName")}
                  >
                    Çalışan Ad Soyad
                    {sortDirection["employeeName"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th
                    className="text-center text-nowrap"
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
                    className="text-center text-nowrap"
                    onClick={() => sortBy("requestDate")}
                  >
                    Talep Tarihi
                    {sortDirection["requestDate"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th
                    className="text-center text-nowrap"
                    onClick={() => sortBy("amount")}
                  >
                    Miktar
                    {sortDirection["amount"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th
                    className="text-center text-nowrap"
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
                    className="text-center text-nowrap"
                    onClick={() => sortBy("approvalStatus")}
                  >
                    Onay Durumu
                    {sortDirection["approvalStatus"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th className="text-center text-nowrap">Döküman</th>
                  <th className="text-center text-nowrap">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {currentExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="text-center">
                      {expense.employeeFirstName} {expense.employeeSecondName}{" "}
                      {expense.employeeLastName}{" "}
                      {expense.employeeSecondLastName}
                    </td>
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
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-success me-1"
                          onClick={() => confirmApprove(expense.id)}
                          disabled={!isActionEnabled(expense.approvalStatus)}
                        >
                          Onayla
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => confirmReject(expense.id)}
                          disabled={!isActionEnabled(expense.approvalStatus)}
                        >
                          Reddet
                        </button>
                      </div>
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

export default ManagerExpenseList;
