import React, { useState, useEffect } from "react";
import { fetchPermissions } from "./api/api";

function EmployeePermissions() {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const getEmployeePermissions = async () => {
      try {
        const permissionsData = await fetchPermissions();
        setPermissions(permissionsData.permissions);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    getEmployeePermissions();
  }, []);

  const handleDownload = async (fileName) => {
    // İndirme işlemi kodu burada
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="text-center mb-4">İzin Talebi Listesi</h1>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="bg-primary text-light">
                <tr>
                  <th>Permission Type</th>
                  <th>Request Date</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Number of Days</th>
                  <th>Approval Status</th>
                  <th>Download File</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission) => (
                  <tr key={permission.id}>
                    <td>{permission.permissionType}</td>
                    <td>{permission.requestDate}</td>
                    <td>{permission.startDate}</td>
                    <td>{permission.endDate}</td>
                    <td>{permission.numberOfDays}</td>
                    <td>{permission.approvalStatus}</td>
                    <td className="text-center">
                      {permission.fileName && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleDownload(permission.fileName)}
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

export default EmployeePermissions;
