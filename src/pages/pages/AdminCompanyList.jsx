import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCompanies, uploadPhotoAndGetPath } from "../api/api";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCompanies();
        setCompanies(data.reverse());
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

  const handleUploadLogo = async (event, companyId) => {
    const file = event.target.files[0]; // İlk dosyayı al
    try {
      const { fileName } = await uploadPhotoAndGetPath(file);
      // Yükleme başarılıysa, logo yolu ile şirketin logosunu güncelle
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.id === companyId ? { ...company, logoImagePath: fileName } : company
        )
      );
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const name = `${company.name}`.toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Şirket Listesi</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Şirket adı ile ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
          {filteredCompanies.map((company) => (
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
      {selectedCompany && (
        <div id="myModal" className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Şirket Bilgileri</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                
              <p><strong>Logo:</strong> <img src={selectedCompany.logoImagePath} alt="Logo" /></p>
                <p><strong>Şirket Adı:</strong> {selectedCompany.name}</p>
                <p><strong>Ünvan:</strong> {selectedCompany.title}</p>
                <p><strong>Mersis No:</strong> {selectedCompany.mersisNo}</p>
                <p><strong>Vergi Numarası:</strong> {selectedCompany.taxNumber}</p>
                <p><strong>Vergi Dairesi:</strong> {selectedCompany.taxDepartment}</p>
                <p><strong>Telefon:</strong> {selectedCompany.phoneNumber}</p>
                <p><strong>Adres:</strong> {selectedCompany.address}</p>
                <p><strong>E-posta:</strong> {selectedCompany.email}</p>
                <p><strong>Çalışan Sayısı:</strong> {selectedCompany.employeeCount}</p>
                <p><strong>Kuruluş Tarihi:</strong> {new Date(selectedCompany.foundingDate).toLocaleDateString("tr-TR")}</p>
                <p><strong>Anlaşma Başlangıç Tarihi:</strong> {new Date(selectedCompany.dealStartDate).toLocaleDateString("tr-TR")}</p>
                <p><strong>Anlaşma Bitiş Tarihi:</strong> {selectedCompany.dealEndDate ? new Date(selectedCompany.dealEndDate).toLocaleDateString("tr-TR") : "-"}</p>
                <p><strong>Durum:</strong> {selectedCompany.isActive ? "Aktif" : "Pasif"}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Kapat</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyList;
