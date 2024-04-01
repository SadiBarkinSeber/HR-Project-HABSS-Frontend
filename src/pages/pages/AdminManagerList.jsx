import React, { useState, useEffect } from "react";
import { fetchManagers } from "../api/api";

function Managers() {
  const [managers, setManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Yöneticileri filtreleme fonksiyonu
  const filteredManagers = managers.filter((manager) => {
    const fullName =
      `${manager.firstName} ${manager.firstSurname}`.toLowerCase();
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Managers;
