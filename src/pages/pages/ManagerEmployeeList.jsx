import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees2 } from "../api/api";
import Pagination from "react-bootstrap/Pagination";

function ManagerEmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchEmployees2();
        setEmployees(data.reverse());
        setFilteredEmployees(data.reverse());
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }
    fetchData();
  }, []);

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    document.getElementById("myModal").style.display = "block";
  };

  const handleCloseModal = () => {
    document.getElementById("myModal").style.display = "none";
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(filteredEmployees.length / itemsPerPage);
      i++
    ) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => paginate(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pageNumbers;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredEmployees.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = employees.filter((employee) => {
      const fullName =
        `${employee.firstName} ${employee.firstSurname}`.toLowerCase();
      return fullName.includes(e.target.value.toLowerCase());
    });
    setFilteredEmployees(filtered);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Çalışan Listesi</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="İsim veya soyisim ile ara..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Telefon</th>
            <th>E-posta</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.firstSurname}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.email}</td>
              <td>{employee.isActive ? "Aktif" : "Pasif"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewDetails(employee)}
                >
                  Detayları Gör
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          />
          {renderPaginationItems()}
          <Pagination.Next
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredEmployees.length / itemsPerPage)
            }
          />
        </Pagination>
      </div>
      {selectedEmployee && (
        <div id="myModal" className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Çalışan Bilgileri</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedEmployee.imagePath}
                  alt=""
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <p>
                  <strong>Ad:</strong> {selectedEmployee.firstName}
                </p>
                <p>
                  <strong>İkinci Ad:</strong> {selectedEmployee.secondName}
                </p>
                <p>
                  <strong>Soyad:</strong> {selectedEmployee.firstSurname}
                </p>
                <p>
                  <strong>İkinci Soyad:</strong>{" "}
                  {selectedEmployee.secondSurname}
                </p>
                <p>
                  <strong>Telefon:</strong> {selectedEmployee.phoneNumber}
                </p>
                <p>
                  <strong>Doğum Tarihi:</strong>{" "}
                  {new Date(selectedEmployee.dateOfBirth).toLocaleDateString(
                    "tr-TR"
                  )}
                </p>
                <p>
                  <strong>Doğum Yeri:</strong> {selectedEmployee.birthPlace}
                </p>
                <p>
                  <strong>TC Kimlik No:</strong> {selectedEmployee.tc}
                </p>
                <p>
                  <strong>Adres:</strong> {selectedEmployee.address}
                </p>
                <p>
                  <strong>Şirket Adı:</strong> {selectedEmployee.company}
                </p>
                <p>
                  <strong>Pozisyon:</strong> {selectedEmployee.position}
                </p>
                <p>
                  <strong>Departman:</strong> {selectedEmployee.department}
                </p>
                <p>
                  <strong>İşe Giriş Tarihi:</strong>{" "}
                  {new Date(selectedEmployee.startDate).toLocaleDateString(
                    "tr-TR"
                  )}
                </p>
                <p>
                  <strong>Maaş:</strong> {selectedEmployee.wage}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagerEmployeeList;
