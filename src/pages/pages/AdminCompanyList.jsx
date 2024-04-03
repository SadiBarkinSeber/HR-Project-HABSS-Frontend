import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCompanies, uploadPhotoAndGetPath } from "../api/api";
import Pagination from "react-bootstrap/Pagination";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
        setFilteredCompanies(data.reverse());
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }
    fetchData();
  }, []);

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    document.getElementById("myModal").style.display = "block";
  };

  const handleCloseModal = () => {
    document.getElementById("myModal").style.display = "none";
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompanies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(filteredCompanies.length / itemsPerPage);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = companies.filter((company) => {
      const name = `${company.name}`.toLowerCase();
      return name.includes(e.target.value.toLowerCase());
    });
    setFilteredCompanies(filtered);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Şirket Listesi</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Şirket adı ile ara..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Şirket Adı</th>
            <th>Ünvan</th>
            <th>Telefon</th>
            <th>E-posta</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((company) => (
            <tr key={company.Id}>
              <td>{company.name}</td>
              <td>{company.title}</td>
              <td>{company.phoneNumber}</td>
              <td>{company.email}</td>
              <td>{company.IsActive ? "Aktif" : "Pasif"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewDetails(company)}
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
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {renderPaginationItems()}
          <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredCompanies.length / itemsPerPage)
            }
          />
        </Pagination>
      </div>
      {selectedCompany && (
        <div id="myModal" className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Şirket Bilgileri</h5>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Şirket Adı:</strong> {selectedCompany.name}
                </p>
                <p>
                  <strong>Ünvan:</strong> {selectedCompany.title}
                </p>
                <p>
                  <strong>Mersis No:</strong> {selectedCompany.mersisNo}
                </p>
                <p>
                  <strong>Vergi Numarası:</strong> {selectedCompany.taxNumber}
                </p>
                <p>
                  <strong>Vergi Dairesi:</strong>{" "}
                  {selectedCompany.taxDepartment}
                </p>
                <p>
                  <strong>Telefon:</strong> {selectedCompany.phoneNumber}
                </p>
                <p>
                  <strong>Adres:</strong> {selectedCompany.address}
                </p>
                <p>
                  <strong>E-posta:</strong> {selectedCompany.email}
                </p>
                <p>
                  <strong>Çalışan Sayısı:</strong>{" "}
                  {selectedCompany.employeeCount}
                </p>
                <p>
                  <strong>Kuruluş Tarihi:</strong>{" "}
                  {new Date(selectedCompany.foundingDate).toLocaleDateString(
                    "tr-TR"
                  )}
                </p>
                <p>
                  <strong>Anlaşma Başlangıç Tarihi:</strong>{" "}
                  {new Date(selectedCompany.dealStartDate).toLocaleDateString(
                    "tr-TR"
                  )}
                </p>
                <p>
                  <strong>Anlaşma Bitiş Tarihi:</strong>{" "}
                  {selectedCompany.dealEndDate
                    ? new Date(selectedCompany.dealEndDate).toLocaleDateString(
                        "tr-TR"
                      )
                    : "-"}
                </p>
                <p>
                  <strong>Durum:</strong>{" "}
                  {selectedCompany.isActive ? "Aktif" : "Pasif"}
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

export default CompanyList;
