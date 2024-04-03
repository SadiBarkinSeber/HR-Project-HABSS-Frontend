import React, { useState, useEffect } from "react";
import { fetchAllAdvanceList } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { updateAdvanceStatus } from "../api/api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-bootstrap/Pagination";

function ManagerAdvanceList() {
  const [advances, setAdvances] = useState([]);
  const [sortedAdvances, setSortedAdvances] = useState([]);
  const [sortDirection, setSortDirection] = useState({});
  const [filterOption, setFilterOption] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [advancesPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchAllAdvanceList();
    setAdvances(data);
    setSortedAdvances([...data].reverse());
  };

  const isActionEnabled = (approvalStatus) => {
    return approvalStatus === "Talep Edildi";
  };

  const handleApprove = async (id) => {
    confirmAlert({
      title: "Avans Talebini Onayla",
      message: "Avans talebini onaylamak istediğinize emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: async () => {
            const updateResult = await updateAdvanceStatus(id, true);
            if (updateResult.success) {
              toast.success("Avans talebi onaylandı");
              fetchData();
            } else {
              toast.error(updateResult.message);
            }
          },
        },
        {
          label: "Hayır",
          onClick: () => {},
        },
      ],
    });
  };

  const handleReject = async (id) => {
    confirmAlert({
      title: "Avans Talebini Reddet",
      message: "Avans talebini reddetmek istediğinize emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: async () => {
            const updateResult = await updateAdvanceStatus(id, false);
            if (updateResult.success) {
              toast.error("Avans talebi reddedildi");
              fetchData();
            } else {
              toast.error(updateResult.message);
            }
          },
        },
        {
          label: "Hayır",
          onClick: () => {},
        },
      ],
    });
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("tr-TR");
  };

  const sortBy = (key) => {
    let direction = sortDirection[key] === "asc" ? "desc" : "asc";
    setSortDirection({ [key]: direction });

    const sorted = [...sortedAdvances].sort((a, b) => {
      if (key === "advanceType") {
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
    setSortedAdvances(sorted);
  };

  const filterAdvances = (advance) => {
    if (filterOption === "all") {
      return true;
    } else if (filterOption === "individual") {
      return advance.advanceType === "Bireysel";
    } else if (filterOption === "corporate") {
      return advance.advanceType === "Kurumsal";
    } else {
      return advance.permission === filterOption;
    }
  };

  // Pagination calculations
  const indexOfLastAdvance = currentPage * advancesPerPage;
  const indexOfFirstAdvance = indexOfLastAdvance - advancesPerPage;
  const currentAdvances = sortedAdvances
    .filter(filterAdvances)
    .slice(indexOfFirstAdvance, indexOfLastAdvance);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  <th onClick={() => sortBy("employeeName")}>
                    Çalışan Ad Soyad
                    {sortDirection["employeeName"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th onClick={() => sortBy("advanceType")}>
                    Avans Türü{" "}
                    {sortDirection["advanceType"] === "asc" ? (
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
                  <th>Açıklama</th>
                  <th onClick={() => sortBy("amount")}>
                    Miktar{" "}
                    {sortDirection["amount"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th onClick={() => sortBy("currency")}>
                    Para Birimi{" "}
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
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {currentAdvances.map((advance) => (
                  <tr key={advance.id}>
                    <td>
                      {advance.employeeFirstName}
                      {advance.employeeSecondName}
                      {advance.employeeLastName}
                      {advance.employeeSecondLastName}
                    </td>
                    <td>{advance.advanceType}</td>
                    <td>{formatDate(advance.requestDate)}</td>
                    <td>{advance.description}</td>
                    <td>{advance.amount}</td>
                    <td>{advance.currency}</td>
                    <td>{advance.approvalStatus}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleApprove(advance.id)}
                        disabled={!isActionEnabled(advance.approvalStatus)}
                      >
                        Onayla
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleReject(advance.id)}
                        disabled={!isActionEnabled(advance.approvalStatus)}
                      >
                        Reddet
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[
                ...Array(
                  Math.ceil(
                    sortedAdvances.filter(filterAdvances).length /
                      advancesPerPage
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
                    sortedAdvances.filter(filterAdvances).length /
                      advancesPerPage
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

export default ManagerAdvanceList;
