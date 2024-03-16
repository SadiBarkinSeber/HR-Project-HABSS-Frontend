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
  }, [1]);

  return (
    <div>
      <h2>Employee Permissions</h2>
      <ul>
        {permissions.map((permission) => (
          <li key={permission.id}>
            {permission.permissionType} {permission.startDate}{" "}
            {permission.fileName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeePermissions;
