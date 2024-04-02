import axios from "axios";

const BASE_URL = "https://hrprojectwebapi20240311113118.azurewebsites.net/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchEmployees = async (id) => {
  try {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const fetchCompanies = async () => {
  try {
    const response = await api.get("/company");
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

export const updateEmployee = async (id, phoneNumber, address, photoPath) => {
  try {
    const response = await api.put("/employees/", {
      id: id,
      phoneNumber: phoneNumber,
      address: address,
      imagePath: photoPath,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const uploadPhotoAndGetPath = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file); // Dosyanın adı "file" olmalı

    const response = await axios.post(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/File/upload",
      formData, // FormData nesnesini doğrudan gönder
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // API'den dönen yanıtı alın
    const responseData = response.data;

    // UploadFileDTO nesnesinden FileName özelliğini alın
    const fileName = responseData.fileName;

    // Dosya adını ve yanıtı döndürün
    return { fileName, response };
  } catch (error) {
    console.error("Error uploading photo and getting path:", error);
    throw error;
  }
};

export const LoginCheck = (emailP, passwordP) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://hrprojectwebapi20240311113118.azurewebsites.net/api/account/login",
        {
          email: emailP,
          password: passwordP,
          oneTimeCode: passwordP,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        resolve(response);
        console.log(response);
      })
      .catch((error) => {
        resolve(error.response); // API'den gelen yanıtı resolve ediyoruz
      });
  });
};

export const checkEmailExists = async (email) => {
  try {
    const response = await axios.post(
      `https://hrprojectwebapi20240311113118.azurewebsites.net/api/account/resetpassword?email=${email}`
    );
    if (response.status === 200) {
      // Başarılı bir yanıt geldi, exists değerini döndür
      return true;
    } else {
      // Başarısız bir yanıt geldi, false döndür
      return false;
    }
  } catch (error) {
    console.error("Email kontrolü sırasında bir hata oluştu:", error);
    return false; // Hata durumunda false döner
  }
};

export const createPermission = async (formData) => {
  try {
    const response = await axios.post(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Permission",
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const fetchPermissions = async (token) => {
//   const headers={
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   }
//   try {
//     const response = await axios.get(
//       "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Permission/1/byEmployee"
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching permissions:", error);
//     throw error; // Hata durumunda isteği yukarıya fırlat
//   }
// };
export const fetchPermissions = async (token) => {
  console.log(token);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include token in the Authorization header
    },
  };

  try {
    const response = await axios.get(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Permission/1/byEmployee",
      config // Pass the config object containing headers
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw error; // Throw the error in case of failure
  }
};

async function fetchAdvances() {
  try {
    const response = await axios.get(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Advances/1/byEmployee"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advance:", error);
    return []; // Hata durumunda boş bir dizi döndürüyoruz
  }
}

export { fetchAdvances };

async function createAdvance(createObject) {
  try {
    const response = await axios.post(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Advances",
      createObject
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advance:", error);
    return []; // Hata durumunda boş bir dizi döndürüyoruz
  }
}

export { createAdvance };

async function fetchExpenses() {
  try {
    const response = await axios.get(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Expenses/1/byEmployee"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
}

export { fetchExpenses };

const sendFormData = async (formData) => {
  try {
    const response = await axios.post(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Expenses",
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error("API isteği başarısız oldu.");
  }
};

export { sendFormData };

async function createEmployee(createObject) {
  try {
    const response = await axios.post(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Employees",
      createObject
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advance:", error);
    return []; // Hata durumunda boş bir dizi döndürüyoruz
  }
}

export { createEmployee };

async function fetchAllPermission(id) {
  try {
    const response = await axios.get(
      `https://hrprojectwebapi20240311113118.azurewebsites.net/api/Permission/${id}/byEmployee`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advance:", error);
    return []; // Hata durumunda boş bir dizi döndürüyoruz
  }
}

export { fetchAllPermission };

async function fetchAllAdvances(id) {
  try {
    const response = await axios.get(
      `https://hrprojectwebapi20240311113118.azurewebsites.net/api/Advances/${id}/byEmployee`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advance:", error);
    return []; // Hata durumunda boş bir dizi döndürüyoruz
  }
}

export { fetchAllAdvances };

async function fetchAllExpenses(id) {
  try {
    const response = await axios.get(
      `https://hrprojectwebapi20240311113118.azurewebsites.net/api/Expenses/${id}/byEmployee`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
}

export { fetchAllExpenses };

export const fetchManager = async (id) => {
  try {
    const response = await api.get(`/manager/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching manager:", error);
    throw error;
  }
};

export const updateManager = async (id, phoneNumber, address, photoPath) => {
  try {
    const response = await api.put("/manager/", {
      id: id,
      phoneNumber: phoneNumber,
      address: address,
      imagePath: photoPath,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating manager:", error);
    throw error;
  }
};

export const fetchEmployees2 = async () => {
  try {
    const response = await api.get("/employees");
    return response.data; // API'den dönen verinin direkt olarak dönüşü sağlanıyor
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export async function downloadFile(fileName) {
  try {
    const response = await fetch(
      `https://hrprojectwebapi20240311113118.azurewebsites.net/api/file/download?fileName=${fileName}`
    );

    if (!response.ok) {
      throw new Error("Dosya indirme sırasında bir hata oluştu.");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url); // Bellek sızıntısını önlemek için URL'yi serbest bırakın
    return { success: true, message: "Dosya indirildi." };
  } catch (error) {
    console.error("Dosya indirme hatası:", error);
    return { success: false, message: error.message };
  }
}

export async function updateAdvanceStatus(id, isApproved) {
  try {
    const response = await axios.put(
      `https://hrprojectwebapi20240311113118.azurewebsites.net/api/advances/manager`,
      { id, isApproved }
    );
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("Avans durumu güncelleme hatası:", error);
    return { success: false, message: error.message };
  }
}

export async function updateAdvanceStatusForEmployee(id, isCancelled) {
  try {
    const response = await axios.put(
      `https://hrprojectwebapi20240311113118.azurewebsites.net/api/advances/employee`,
      { id, isCancelled }
    );
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("Avans durumu güncelleme hatası:", error);
    return { success: false, message: error.message };
  }
}

export async function updateExpenseStatus(id, isApproved) {
  try {
    const response = await axios.put(
      `https://hrprojectwebapi20240311113118.azurewebsites.net/api/expenses/manager`,
      { id, isApproved }
    );
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("Harcama durumu güncelleme hatası:", error);
    return { success: false, message: error.message };
  }
}

export async function updateExpenseStatusForEmployee(id, isCancelled) {
  try {
    const response = await axios.put(
      `https://hrprojectwebapi20240311113118.azurewebsites.net/api/expenses/employee`,
      { id, isCancelled }
    );
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("Harcama durumu güncelleme hatası:", error);
    return { success: false, message: error.message };
  }
}

export async function updatePermissionStatus(id, isApproved) {
  try {
    const response = await axios.put(
      `https://hrprojectwebapi20240311113118.azurewebsites.net/api/permission/manager`,
      { id, isApproved }
    );
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("Izin durumu güncelleme hatası:", error);
    return { success: false, message: error.message };
  }
}

export async function updatePermissionStatusForEmployee(id, isCancelled) {
  try {
    const response = await axios.put(
      `https://hrprojectwebapi20240311113118.azurewebsites.net/api/permission/employee`,
      { id, isCancelled }
    );
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("Izin durumu güncelleme hatası:", error);
    return { success: false, message: error.message };
  }
}

export async function changePassword(email, password, repeatPassword) {
  try {
    const response = await axios.put(
      `https://hrprojectwebapi20240311113118.azurewebsites.net/api/account`,
      { email, password, repeatPassword }
    );
    return response;
  } catch (error) {
    console.error("Sifre güncelleme hatası:", error);
    return { success: false, message: error.message };
  }
}

async function createCompany(createObject) {
  try {
    const response = await axios.post(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Company",
      createObject
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching company:", error);
    return []; // Hata durumunda boş bir dizi döndürüyoruz
  }
}
export { createCompany };

export const fetchSiteManagers = async (id) => {
  try {
    const response = await api.get(`/siteManager/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
};

export const updateSiteManager = async (
  id,
  phoneNumber,
  address,
  photoPath
) => {
  try {
    const response = await api.put("/SiteManager/", {
      id: id,
      phoneNumber: phoneNumber,
      address: address,
      imagePath: photoPath,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating site manager:", error);
    throw error;
  }
};

export const createManager = async (managerData) => {
  console.log(managerData);
  try {
    const response = await axios.post(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/manager",
      managerData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchManagers = async () => {
  try {
    const response = await api.get("/manager");
    return response.data;
  } catch (error) {
    console.error("Error fetching managers:", error);
    throw error;
  }
};

async function fetchAllPermissionList() {
  try {
    const response = await axios.get(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Permission"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching permission:", error);
    return []; // Hata durumunda boş bir dizi döndürüyoruz
  }
}

export { fetchAllPermissionList };

async function fetchAllExpenseList() {
  try {
    const response = await axios.get(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Expenses"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return []; // Hata durumunda boş bir dizi döndürüyoruz
  }
}

export { fetchAllExpenseList };

async function fetchAllAdvanceList() {
  try {
    const response = await axios.get(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Advances"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advances:", error);
    return []; // Hata durumunda boş bir dizi döndürüyoruz
  }
}

export { fetchAllAdvanceList };

export default api;
