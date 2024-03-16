import React, { useState, useEffect } from 'react';
import { fetchAdvances } from '../api/api';

function AdvanceList() {
  const [advance, setAdvance] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAdvances();
      setAdvance(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Advances List</h1>
      <table className="advance-table">
        <thead>
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
          {advance.map((advance) => (
            <tr key={advance.id}>
              <td>{advance.advanceType}</td>
              <td>{advance.requestDate}</td>
              <td>{advance.description}</td>
              <td>{advance.amount}</td>
              <td>{advance.currency}</td>
              <td>{advance.permission}</td>
              <td><button className="cancel-button">İşlem İptal</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdvanceList;
