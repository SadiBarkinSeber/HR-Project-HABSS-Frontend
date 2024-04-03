import React, { useState, useEffect } from "react";
import { fetchAllAdvances, updateAdvanceStatusForEmployee } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { updateAdvanceStatus } from "../api/api";
import { confirmAlert } from "react-confirm-alert";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useEmp } from "../../components/EmployeeContext";
import Pagination from "react-bootstrap/Pagination";

function AdvanceList() {
  const [advances, setAdvances] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [sortDirection, setSortDirection] = useState({});
  const [sortedAdvances, setSortedAdvances] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [advancesPerPage] = useState(10);
  const { empData, refreshData } = useEmp();

  useEffect(() => {
    fetchData();
  }, []);

  const employeeId = localStorage.getItem("empId");

  const fetchData = async () => {
    const data = await fetchAllAdvances(employeeId);
    setAdvances([...data].reverse());
    setSortedAdvances([...data].reverse());
  };

  const handleReject = async (id) => {
    confirmAlert({
      title: "Avans Talebini İptal Et",
      message: "Avans talebini iptal etmek istediğinize emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: async () => {
            const updateResult = await updateAdvanceStatusForEmployee(
              id,
              false
            );
            if (updateResult.success) {
              toast.success("Avans Talebiniz iptal edilmiştir.");
              fetchData();
            } else {
              toast.error(
                "Avans Talebiniz iptal edilirken bir sorun ile karşılaşıldı."
              );
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

  const sortBy = (key) => {
    const direction = sortDirection[key] === "asc" ? "desc" : "asc";
    setSortDirection({ ...sortDirection, [key]: direction });
    const sorted = [...advances].sort((a, b) => {
      if (
        key === "advanceType" ||
        key === "requestDate" ||
        key === "currency" ||
        key === "approvalStatus"
      ) {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
    });
    setAdvances(sorted);
  };

  const isCancelEnabled = (approvalStatus) => {
    return approvalStatus === "Talep Edildi";
  };

  const indexOfLastAdvance = currentPage * advancesPerPage;
  const indexOfFirstAdvance = indexOfLastAdvance - advancesPerPage;
  const currentAdvances = advances
    .filter(filterAdvances)
    .slice(indexOfFirstAdvance, indexOfLastAdvance);

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
                  <th
                    className="text-center"
                    onClick={() => sortBy("advanceType")}
                  >
                    Avans Türü{" "}
                    {sortDirection["advanceType"] === "asc" ? (
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
                  <th className="text-center">Açıklama</th>
                  <th className="text-center" onClick={() => sortBy("amount")}>
                    Miktar{" "}
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
                    Para Birimi{" "}
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
                  <th className="text-center">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {currentAdvances.map((advance) => (
                  <tr key={advance.id}>
                    <td className="text-center">{advance.advanceType}</td>
                    <td className="text-center">
                      {formatDate(advance.requestDate)}
                    </td>
                    <td className="text-center">{advance.description}</td>
                    <td className="text-center">{advance.amount}</td>
                    <td className="text-center">{advance.currency}</td>
                    <td className="text-center">{advance.approvalStatus}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleReject(advance.id)}
                        disabled={!isCancelEnabled(advance.approvalStatus)}
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
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[
            ...Array(
              Math.ceil(
                advances.filter(filterAdvances).length / advancesPerPage
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
                advances.filter(filterAdvances).length / advancesPerPage
              )
            }
          />
        </Pagination>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}

export default AdvanceList;
