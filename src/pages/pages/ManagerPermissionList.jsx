import React, { useState, useEffect } from "react";
import { fetchAllPermission } from "../api/api"; // Örnek bir downloadFile fonksiyonunu ekledim
import { useAuth } from "../../components/TokenContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManagerPermissionList() {
  const [permissions, setPermissions] = useState([]);
  const [sortedPermissions, setSortedPermissions] = useState([]);
  const [filterOption, setFilterOption] = useState(""); // İzin türü filtresi
  const { token, setAuthToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permissionsData = await fetchAllPermission(token);
        setPermissions(permissionsData); // permissionsData.permissions yerine sadece permissionsData kullanıldı
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchData();
  }, [token]); // token bağımlılığı eklendi

  useEffect(() => {
    setSortedPermissions([...permissions]);
  }, [permissions]);

  const sortByPermissionType = () => {
    const sorted = [...sortedPermissions].sort((a, b) => {
      return a.permissionType.localeCompare(b.permissionType);
    });
    setSortedPermissions(sorted);
  };

  const sortByStartDate = () => {
    const sorted = [...sortedPermissions].sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    });
    setSortedPermissions(sorted);
  };

  const sortByRequestDate = () => {
    const sorted = [...sortedPermissions].sort((a, b) => {
      return new Date(a.requestDate) - new Date(b.requestDate);
    });
    setSortedPermissions(sorted);
  };

  const sortByEndDate = () => {
    const sorted = [...sortedPermissions].sort((a, b) => {
      return new Date(a.endDate) - new Date(b.endDate);
    });
    setSortedPermissions(sorted);
  };

  const sortByApprovalStatus = () => {
    const sorted = [...sortedPermissions].sort((a, b) => {
      return a.approvalStatus.localeCompare(b.approvalStatus);
    });
    setSortedPermissions(sorted);
  };

  const handleDownload = async (fileName) => {
    try {
      // downloadFile fonksiyonu eklendi
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

  const handleApprove = async (id) => {
    try {
      await approvePermission(id);
      const updatedPermissions = permissions.map((permission) => {
        if (permission.id === id) {
          return { ...permission, approvalStatus: "Onaylandı" };
        }
        return permission;
      });
      setPermissions(updatedPermissions);
      toast.success("İzin başarıyla onaylandı");
    } catch (error) {
      console.error("Error approving permission:", error);
      toast.error("İzin onaylama sırasında bir hata oluştu");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectPermission(id);
      const updatedPermissions = permissions.map((permission) => {
        if (permission.id === id) {
          return { ...permission, approvalStatus: "Reddedildi" };
        }
        return permission;
      });
      setPermissions(updatedPermissions);
      toast.success("İzin başarıyla reddedildi");
    } catch (error) {
      console.error("Error rejecting permission:", error);
      toast.error("İzin reddetme sırasında bir hata oluştu");
    }
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
                  <th onClick={sortByPermissionType}>
                    İzin Türü{" "}
                    <span className="sort-icon" onClick={sortByPermissionType}>
                      ▼
                    </span>
                  </th>
                  <th onClick={sortByRequestDate}>
                    Talep Tarihi{" "}
                    <span className="sort-icon" onClick={sortByRequestDate}>
                      ▼
                    </span>
                  </th>
                  <th onClick={sortByStartDate}>
                    Başlangıç Tarihi{" "}
                    <span className="sort-icon" onClick={sortByStartDate}>
                      ▼
                    </span>
                  </th>
                  <th onClick={sortByEndDate}>
                    Bitiş Tarihi{" "}
                    <span className="sort-icon" onClick={sortByEndDate}>
                      ▼
                    </span>
                  </th>
                  <th onClick={sortByApprovalStatus}>
                    Onay Durumu{" "}
                    <span className="sort-icon" onClick={sortByApprovalStatus}>
                      ▼
                    </span>
                  </th>
                  <th>Dosya İndir</th>
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
                          className="btn btn-sm btn-success"
                          onClick={() => handleApprove(permission.id)}
                        >
                          Onayla
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleReject(permission.id)}
                        >
                          Reddet
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </div>
  );
}

export default ManagerPermissionList;
