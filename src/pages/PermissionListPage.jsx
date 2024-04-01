import React, { useState, useEffect } from "react";
import { fetchAllPermission } from "./api/api";
import { ToastContainer, toast } from "react-toastify";
import { downloadFile } from "./api/api";
import { updatePermissionStatus } from "./api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { useEmp } from "../components/EmployeeContext";

function PermissionList() {
  const [permissions, setPermissions] = useState([]); // Boş dizi olarak başlat
  const [sortedPermissions, setSortedPermissions] = useState([]);
  const [filterOption, setFilterOption] = useState("");
  const [sortDirection, setSortDirection] = useState({});
  const { empData, refreshData } = useEmp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllPermission(empData.id);
        if (
          response &&
          response.permissions &&
          Array.isArray(response.permissions)
        ) {
          setPermissions(response.permissions); // permissions anahtarından gelen diziyi set et
        } else {
          console.error("Invalid data format:", response);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    setSortedPermissions([...permissions].reverse());
  }, [permissions]);

  const handleReject = async (id) => {
    try {
      const updateResult = await updatePermissionStatus(id, false);
      if (updateResult.success) {
        toast.success(updateResult.message);
        // İzin reddedildiğinde izni kaldırın ve yeniden sıralayın
        const updatedPermissions = permissions.filter(
          (permission) => permission.id !== id
        );
        setPermissions(updatedPermissions);
        setSortedPermissions([...updatedPermissions].reverse());
      } else {
        toast.error(updateResult.message);
      }
    } catch (error) {
      console.error("Error rejecting permission:", error);
      toast.error("İzin reddedilirken bir hata oluştu");
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
      await downloadFile(fileName); // Örnek indirme fonksiyonu çağrısı
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

  const confirmReject = (id) => {
    confirmAlert({
      title: "İzin İptali",
      message: "Bu izni iptal etmek istediğinizden emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () => {
            handleReject(id);
            toast.success("İzin başarıyla iptal edildi.");
          },
        },
        {
          label: "Hayır",
          onClick: () => {}, // Hiçbir şey yapma
        },
      ],
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
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
                  setSortedPermissions([...permissions]); // Tüm izinleri göstermek için sıralı izinleri tüm izinlerle güncelle
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
                  <th onClick={() => sortBy("permissionType")}>
                    İzin Türü{" "}
                    {sortDirection["permissionType"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th onClick={() => sortBy("requestDate")}>
                    Talep Tarihi
                    {sortDirection["requestDate"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th onClick={() => sortBy("startDate")}>
                    Başlangıç Tarihi{" "}
                    {sortDirection["startDate"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th onClick={() => sortBy("endDate")}>
                    Bitiş Tarihi{" "}
                    {sortDirection["endDate"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th onClick={() => sortBy("approvalStatus")}>
                    Onay Durumu
                    {sortDirection["approvalStatus"] === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </th>
                  <th>Döküman</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {sortedPermissions
                  .filter(filterPermissions)
                  .map((permission) => (
                    <tr key={permission.id}>
                      <td>{permission.permissionType}</td>
                      <td>{formatDate(permission.requestDate)}</td>
                      <td>{formatDate(permission.startDate)}</td>
                      <td>{formatDate(permission.endDate)}</td>
                      <td>{permission.approvalStatus}</td>
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
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => confirmReject(permission.id)}
                        >
                          İptal Et
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}

export default PermissionList;
