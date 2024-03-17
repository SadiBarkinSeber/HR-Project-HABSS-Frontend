import React, { useState, useEffect } from "react";
import { fetchExpenses } from "./api/api";

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="text-center mb-4">Harcama Talebi Listesi</h1>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="bg-primary text-light">
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
                    <td>
                      {new Date(expense.requestDate).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {expense.fileName && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleDownload(expense.fileName)}
                        >
                          Download
                        </button>
                      )}
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

export default ExpenseList;
