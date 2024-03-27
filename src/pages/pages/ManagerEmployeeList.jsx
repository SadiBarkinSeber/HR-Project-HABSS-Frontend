import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees2 } from "../api/api";

function ManagerEmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Seçilen çalışanın bilgilerini tutacak state
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchEmployees2();
        setEmployees(data.reverse()); // En son eklenen çalışan en üste gelecek şekilde sırala
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }
    fetchData();
  }, []);

  const handleViewDetails = (employee) => {
    // Seçilen çalışanı modal için ayarla
    setSelectedEmployee(employee);
    // Modalı göster
    document.getElementById("myModal").style.display = "block";
  };

  const handleCloseModal = () => {
    // Modalı gizle
    document.getElementById("myModal").style.display = "none";
  };

  // Çalışanları filtreleme fonksiyonu
  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.firstSurname}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Çalışan Listesi</h1>
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
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
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
      {/* Modal */}
      {selectedEmployee && (
        <div id="myModal" className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Çalışan Bilgileri</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={selectedEmployee.imagePath} alt="" style={{ maxWidth: "100%", height: "auto" }} />
                <p><strong>Ad:</strong> {selectedEmployee.firstName}</p>
                <p><strong>İkinci Ad:</strong> {selectedEmployee.secondName}</p>
                <p><strong>Soyad:</strong> {selectedEmployee.firstSurname}</p>
                <p><strong>İkinci Soyad:</strong> {selectedEmployee.secondSurname}</p>
                <p><strong>Telefon:</strong> {selectedEmployee.phoneNumber}</p>
                <p><strong>Doğum Tarihi:</strong> {new Date(selectedEmployee.dateOfBirth).toLocaleDateString("tr-TR")}</p>
                <p><strong>Doğum Yeri:</strong> {selectedEmployee.birthPlace}</p>
                <p><strong>TC Kimlik No:</strong> {selectedEmployee.tc}</p>
                <p><strong>Adres:</strong> {selectedEmployee.address}</p>
                <p><strong>Şirket Adı:</strong> {selectedEmployee.company}</p>
                <p><strong>Pozisyon:</strong> {selectedEmployee.position}</p>
                <p><strong>Departman:</strong> {selectedEmployee.department}</p>
                <p><strong>İşe Giriş Tarihi:</strong> {new Date(selectedEmployee.startDate).toLocaleDateString("tr-TR")}</p>
                <p><strong>Maaş:</strong> {selectedEmployee.wage}</p>
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

export default ManagerEmployeeList;
