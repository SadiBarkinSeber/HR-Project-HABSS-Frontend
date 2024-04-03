
import React, { useState, useEffect } from "react";
import { fetchManagers } from "../api/api";

function Managers() {
  const [managers, setManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchManagers();
        setManagers(data.reverse()); // Veriyi ters çevirerek set et
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    }
    fetchData();
  }, []);

  const handleViewDetails = (manager) => {
    setSelectedManager(manager);
    document.getElementById("myModal").style.display = "block";
  };

  const handleCloseModal = () => {
    setSelectedManager(null);
    document.getElementById("myModal").style.display = "none";
  };

  // Yöneticileri filtreleme fonksiyonu
  const filteredManagers = managers.filter((manager) => {
    const fullName = `${manager.firstName} ${manager.firstSurname}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Yönetici Listesi</h1>
      {/* Arama girdisi */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="İsim veya soyisim ile ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Telefon</th>
            <th>E-posta</th>
            <th>Adres</th>
            <th>Detaylar</th>
          </tr>
        </thead>
        <tbody>
          {filteredManagers.map((manager) => (
            <tr key={manager.id}>
              <td>{manager.firstName}</td>
              <td>{manager.firstSurname}</td>
              <td>{manager.phoneNumber}</td>
              <td>{manager.email}</td>
              <td>{manager.address}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewDetails(manager)}
                >
                  Detayları Gör
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedManager && (
        <div id="myModal" className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Yönetici Detayları</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Adı:</strong> {selectedManager.firstName}</p>
                <p><strong> İkinci Adı:</strong> {selectedManager.secondName}</p>
                <p><strong>Soyadı:</strong> {selectedManager.firstSurname}</p>
                <p><strong> İkinci Soyadı:</strong> {selectedManager.secondSurname}</p>
                <p><strong>Doğum Tarihi:</strong> {new Date(selectedManager.dateOfBirth).toLocaleDateString("tr-TR")}</p>
                <p><strong>Doğum Yeri:</strong> {selectedManager.birthPlace}</p>
                <p><strong>TC Kimlik No:</strong> {selectedManager.tc}</p>
                <p><strong>Adres:</strong> {selectedManager.address}</p>
                <p><strong>Şirket Adı:</strong> {selectedManager.company}</p>
                <p><strong>Pozisyon:</strong> {selectedManager.position}</p>
                <p><strong>Departman:</strong> {selectedManager.department}</p>
                <p><strong>İşe Giriş Tarihi:</strong> {new Date(selectedManager.startDate).toLocaleDateString("tr-TR")}</p>
                <p><strong>Maaş Bilgileri:</strong> {selectedManager.wage}</p>
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

export default Managers;




