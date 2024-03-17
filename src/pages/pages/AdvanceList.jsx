import React, { useState, useEffect } from "react";
import { fetchAdvances } from "../api/api";

function AdvanceList() {
  const [advances, setAdvances] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAdvances();
      setAdvances(data);
    }

    fetchData();
  }, []);

  const handleCancel = (id) => {
    // İptal işlemi kodu burada
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="text-center mb-4">Avans Talebi Listesi</h1>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="bg-primary text-light">
                <tr>
                  <th>Advance Type</th>
                  <th>Request Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Permission</th>
                  <th>Process</th>
                </tr>
              </thead>
              <tbody>
                {advances.map((advance) => (
                  <tr key={advance.id}>
                    <td>{advance.advanceType}</td>
                    <td>{advance.requestDate}</td>
                    <td>{advance.description}</td>
                    <td>{advance.amount}</td>
                    <td>{advance.currency}</td>
                    <td>{advance.permission}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancel(advance.id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvanceList;
