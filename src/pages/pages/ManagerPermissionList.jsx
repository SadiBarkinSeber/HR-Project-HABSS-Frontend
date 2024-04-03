import React, { useState, useEffect } from "react";
import { fetchAllPermissionList } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { downloadFile } from "../api/api";
import { updatePermissionStatus } from "../api/api";
import { confirmAlert } from "react-confirm-alert";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Pagination from "react-bootstrap/Pagination";

function ManagerPermissionList() {
  const [permissions, setPermissions] = useState([]);
  const [sortedPermissions, setSortedPermissions] = useState([]);
  const [sortDirection, setSortDirection] = useState({});
  const [filterOption, setFilterOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [permissionsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permissionsData = await fetchAllPermissionList();
        setPermissions(permissionsData);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSortedPermissions([...permissions].reverse());
  }, [permissions]);

  const handleApprove = async (id) => {
    const updateResult = await updatePermissionStatus(id, true);
    if (updateResult.success) {
      toast.success(updateResult.message);
      const permissionsData = await fetchAllPermissionList();
      setPermissions(permissionsData);
    } else {
      toast.error(updateResult.message);
    }
  };

  const handleReject = async (id) => {
    const updateResult = await updatePermissionStatus(id, false);
    if (updateResult.success) {
      toast.success(updateResult.message);
      const permissionsData = await fetchAllPermissionList();
      setPermissions(permissionsData);
    } else {
      toast.error(updateResult.message);
    }
  };

  const sortBy = (key) => {
    let direction = sortDirection[key] === "asc" ? "desc" : "asc";
    setSortDirection({ [key]: direction });

    const sorted = [...sortedPermissions].sort((a, b) => {
      if (key === "permissionType") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return direction === "asc"
          ? a[key] > b[key]
            ? 1
            : -1
          : a[key] < b[key]
          ? 1
          : -1;
      }
    });
    setSortedPermissions(sorted);
  };

  const handleDownload = async (fileName) => {
    try {
      await downloadFile(fileName);
      toast.success("Dosya başarıyla indirildi");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Dosya indirme sırasında bir hata oluştu");
    }
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("tr-TR");
  };

  const filterPermissions = (permission) => {
    if (filterOption === "" || filterOption === "Hepsi") {
      return true;
    } else {
      return permission.permissionType === filterOption;
    }
  };

  const isActionEnabled = (approvalStatus) => {
    return approvalStatus === "Talep Edildi";
  };

  const confirmApprove = (id) => {
    confirmAlert({
      title: "İzin Onayı",
      message: "Bu izni onaylamak istediğinizden emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () => {
            handleApprove(id);
            toast.success("İzin başarıyla onaylandı.");
          },
        },
        {
          label: "Hayır",
          onClick: () => {},
        },
      ],
    });
  };

  const confirmReject = (id) => {
    confirmAlert({
      title: "İzin Reddi",
      message: "Bu izni reddetmek istediğinizden emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () => {
            handleReject(id);
            toast.error("İzin talebi reddedildi.");
          },
        },
        {
          label: "Hayır",
          onClick: () => {},
        },
      ],
    });
  };

  const indexOfLastPermission = currentPage * permissionsPerPage;
  const indexOfFirstPermission = indexOfLastPermission - permissionsPerPage;
  const currentPermissions = sortedPermissions
    .filter(filterPermissions)
    .slice(indexOfFirstPermission, indexOfLastPermission);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-15 ">
          <h1 className="text-center mb-4">İzin Talebi Listesi</h1>
          <div className="mb-3">
            <label htmlFor="filterOption">Filtrele :</label>
            <select
              id="filterOption"
              className="form-select"
              value={filterOption}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setFilterOption(selectedValue);
                if (selectedValue === "") {
                  setSortedPermissions([...permissions]);
                } else {
                  setSortedPermissions(
                    permissions.filter(
                      (permission) =>
                        permission.permissionType === selectedValue
                    )
                  );
                }
              }}
            >
              <option value="">Hepsi</option>
              <option value="Baba İzni">Baba İzni</option>
              <option value="Anne İzni">Anne İzni</option>
              <option value="Cenaze İzni">Cenaze İzni</option>
              <option value="Evlilik İzni">Evlilik İzni</option>
              <option value="Yıllık İzin">Yıllık İzin</option>
            </select>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="bg-primary text-light">
                <tr>
                  <th
                    className="text-center text-nowrap"
                    onClick={() => sortBy("employeeName")}
                  >
                    Çalışan Ad Soyad{" "}
                    {sortDirection["employeeName"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th
                    className="text-center text-nowrap"
                    onClick={() => sortBy("permissionType")}
                  >
                    İzin Türü{" "}
                    {sortDirection["permissionType"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th
                    className="text-center text-nowrap"
                    onClick={() => sortBy("requestDate")}
                  >
                    Talep Tarihi{" "}
                    {sortDirection["requestDate"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th
                    className="text-center text-nowrap"
                    onClick={() => sortBy("startDate")}
                  >
                    Başlangıç Tarihi{" "}
                    {sortDirection["startDate"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th
                    className="text-center text-nowrap"
                    onClick={() => sortBy("endDate")}
                  >
                    Bitiş Tarihi{" "}
                    {sortDirection["endDate"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th
                    className="text-center text-nowrap"
                    onClick={() => sortBy("approvalStatus")}
                  >
                    Onay Durumu{" "}
                    {sortDirection["approvalStatus"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th className="text-center text-nowrap">Dosya İndir</th>
                  <th className="text-center text-nowrap">İşlem</th>
                </tr>
              </thead>

              <tbody>
                {currentPermissions.map((permission) => (
                  <tr key={permission.id}>
                    <td className="text-center">
                      {permission.employeeFirstName}{" "}
                      {permission.employeeSecondName}{" "}
                      {permission.employeeLastName}{" "}
                      {permission.employeeSecondLastName}
                    </td>
                    <td className="text-center">{permission.permissionType}</td>
                    <td className="text-center">
                      {formatDate(permission.requestDate)}
                    </td>
                    <td className="text-center">
                      {formatDate(permission.startDate)}
                    </td>
                    <td className="text-center">
                      {formatDate(permission.endDate)}
                    </td>
                    <td className="text-center">{permission.approvalStatus}</td>
                    <td className="text-center">
                      {permission.fileName && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleDownload(permission.fileName)}
                        >
                          İndir
                        </button>
                      )}
                    </td>
                    <td className="text-center">
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-success me-1"
                          onClick={() => confirmApprove(permission.id)}
                          disabled={!isActionEnabled(permission.approvalStatus)}
                        >
                          Onayla
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => confirmReject(permission.id)}
                          disabled={!isActionEnabled(permission.approvalStatus)}
                        >
                          Reddet
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[
                ...Array(
                  Math.ceil(
                    sortedPermissions.filter(filterPermissions).length /
                      permissionsPerPage
                  )
                ).keys(),
              ].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(
                    sortedPermissions.filter(filterPermissions).length /
                      permissionsPerPage
                  )
                }
              />
            </Pagination>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}

export default ManagerPermissionList;
