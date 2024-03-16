import React, { useState, useEffect } from 'react';
import { fetchExpenses } from './api/api';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchExpenses();
      setExpenses(data);
    }

    fetchData();
  }, []);

  const handleDownload = async (fileName) => {
    // İndirme işlemi kodu burada
  };

  return (
    <div>
      <h1>Expense List</h1>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Approval Status</th>
            <th>Request Date</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.type}</td>
              <td>{expense.amount}</td>
              <td>{expense.approvalStatus}</td>
              <td>{new Date(expense.requestDate).toLocaleDateString()}</td>
              <td>
                {expense.fileName && (
                  <button onClick={() => handleDownload(expense.fileName)}>Download</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
