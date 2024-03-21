
// import React, { useState, useEffect } from "react";
// import { fetchPermissions } from "./api/api";
// import { useAuth } from "../components/TokenContext";

// function PermissionList() {
//   const [permissions, setPermissions] = useState([]);
//   const [sortedPermissions, setSortedPermissions] = useState([]);
//   const [filterOption, setFilterOption] = useState(""); // İzin türü filtresi
//   const { token, setAuthToken } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const permissionsData = await fetchPermissions(token);
//         setPermissions(permissionsData.permissions);
//       } catch (error) {
//         console.error("Error fetching permissions:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     setSortedPermissions([...permissions]);
//   }, [permissions]);

//   const sortByPermissionType = () => {
//     const sorted = [...sortedPermissions].sort((a, b) => {
//       return a.permissionType.localeCompare(b.permissionType);
//     });
//     setSortedPermissions(sorted);
//   };

//   const sortByStartDate = () => {
//     const sorted = [...sortedPermissions].sort((a, b) => {
//       return new Date(a.startDate) - new Date(b.startDate);
//     });
//     setSortedPermissions(sorted);
//   };

//   const sortByRequestDate = () => {
//     const sorted = [...sortedPermissions].sort((a, b) => {
//       return new Date(a.requestDate) - new Date(b.requestDate);
//     });
//     setSortedPermissions(sorted);
//   };

//   const sortByEndDate = () => {
//     const sorted = [...sortedPermissions].sort((a, b) => {
//       return new Date(a.endDate) - new Date(b.endDate);
//     });
//     setSortedPermissions(sorted);
//   };

//   const sortByApprovalStatus = () => {
//     const sorted = [...sortedPermissions].sort((a, b) => {
//       return a.approvalStatus.localeCompare(b.approvalStatus);
//     });
//     setSortedPermissions(sorted);
//   };

//   const handleDownload = async (fileName) => {
//     // Dosya indirme işlevi burada
//   };

//   const formatDate = (dateTimeString) => {
//     const date = new Date(dateTimeString);
//     return date.toLocaleDateString('tr-TR');
//   };

//   const filterPermissions = (permission) => {
//     if (filterOption === "" || filterOption === "Hepsi") {
//       return true; // Filtre seçilmediyse veya "Hepsi" seçildiyse tüm izinleri göster
//     } else {
//       return permission.permissionType === filterOption;
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-10">
//           <h1 className="text-center mb-4">İzin Talebi Listesi</h1>
//           <div className="mb-3">
//             <label htmlFor="filterOption">Filtrele :</label>
//             <select
//               id="filterOption"
//               className="form-select"
//               value={filterOption}
//               onChange={(e) => {
//                 setFilterOption(e.target.value);
//                 setSortedPermissions(permissions.filter(permission => permission.permissionType === e.target.value));
//               }}
//             >
//               <option value="">Hepsi</option>
//               <option value="Baba İzni">Baba İzni</option>
//               <option value="Anne İzni">Anne İzni</option>
//               <option value="Cenaze İzni">Cenaze İzni</option>
//               <option value="Evlilik İzni">Evlilik İzni</option>
//               <option value="Yıllık İzin">Yıllık İzin</option>
//             </select>
//           </div>
//           <div className="table-responsive">
//             <table className="table table-striped table-bordered table-hover">
//               <thead className="bg-primary text-light">
//                 <tr>
//                   <th onClick={sortByPermissionType}>İzin Türü <span className="sort-icon" onClick={sortByPermissionType}>▼</span></th>
//                   <th onClick={sortByRequestDate}>Talep Tarihi <span className="sort-icon" onClick={sortByRequestDate}>▼</span></th>
//                   <th onClick={sortByStartDate}>Başlangıç Tarihi <span className="sort-icon" onClick={sortByStartDate}>▼</span></th>
//                   <th onClick={sortByEndDate}>Bitiş Tarihi <span className="sort-icon" onClick={sortByEndDate}>▼</span></th>
//                   <th onClick={sortByApprovalStatus}>Onay Durumu <span className="sort-icon" onClick={sortByApprovalStatus}>▼</span></th>
//                   <th>Dosya İndir</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedPermissions.filter(filterPermissions).map((permission) => (
//                   <tr key={permission.id}>
//                     <td>{permission.permissionType}</td>
//                     <td>{formatDate(permission.requestDate)}</td>
//                     <td>{formatDate(permission.startDate)}</td>
//                     <td>{formatDate(permission.endDate)}</td>
//                     <td>{permission.approvalStatus}</td>
//                     <td className="text-center">
//                       {permission.fileName && (
//                         <button
//                           className="btn btn-sm btn-primary"
//                           onClick={() => handleDownload(permission.fileName)}
//                         >
//                           İndir
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PermissionList;

import React, { useState, useEffect } from "react";
import { fetchPermissions } from "./api/api";
import { useAuth } from "../components/TokenContext";

function PermissionList() {
  const [permissions, setPermissions] = useState([]);
  const [sortedPermissions, setSortedPermissions] = useState([]);
  const [filterOption, setFilterOption] = useState(""); // İzin türü filtresi
  const { token, setAuthToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permissionsData = await fetchPermissions(token);
        setPermissions(permissionsData.permissions);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchData();
  }, []);

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
    // Dosya indirme işlevi burada
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('tr-TR');
  };

  const filterPermissions = (permission) => {
    if (filterOption === "" || filterOption === "Hepsi") {
      return true; // Filtre seçilmediyse veya "Hepsi" seçildiyse tüm izinleri göster
    } else {
      return permission.permissionType === filterOption;
    }
  };

  const cancelPermission = (id) => {
    const confirmed = window.confirm("İşlemi iptal etmek istiyor musunuz?");
    if (confirmed) {
      const updatedPermissions = permissions.map((permission) => {
        if (permission.id === id) {
          return { ...permission, approvalStatus: "İptal Edildi", cancelled: true };
        }
        return permission;
      });
      setPermissions(updatedPermissions);
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
                setFilterOption(e.target.value);
                setSortedPermissions(permissions.filter(permission => permission.permissionType === e.target.value));
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
                  <th onClick={sortByPermissionType}>İzin Türü <span className="sort-icon" onClick={sortByPermissionType}>▼</span></th>
                  <th onClick={sortByRequestDate}>Talep Tarihi <span className="sort-icon" onClick={sortByRequestDate}>▼</span></th>
                  <th onClick={sortByStartDate}>Başlangıç Tarihi <span className="sort-icon" onClick={sortByStartDate}>▼</span></th>
                  <th onClick={sortByEndDate}>Bitiş Tarihi <span className="sort-icon" onClick={sortByEndDate}>▼</span></th>
                  <th onClick={sortByApprovalStatus}>Onay Durumu <span className="sort-icon" onClick={sortByApprovalStatus}>▼</span></th>
                  <th>Dosya İndir</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {sortedPermissions.filter(filterPermissions).map((permission) => (
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
                      {!permission.cancelled ? (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => cancelPermission(permission.id)}
                        >
                          İptal Et
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-secondary"
                          disabled
                        >
                          İptal Edildi
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
