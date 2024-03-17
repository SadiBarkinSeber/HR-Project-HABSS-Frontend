import React, { useState, useEffect } from "react";
import { fetchPermissions } from "./api/api";

function PermissionList() {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permissionsData = await fetchPermissions();
        setPermissions(permissionsData.permissions);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchData();
  }, []);

  const handleDownload = async (fileName) => {
    try {
      const response = await fetch(`/api/files/${fileName}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Dosya indirme hatası:", error);
    }
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('tr-TR');
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
                    <td>{formatDate(permission.requestDate)}</td>
                    <td>{formatDate(permission.startDate)}</td>
                    <td>{formatDate(permission.endDate)}</td>
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

export default PermissionList;
