import axios from "axios";

const BASE_URL = "https://hrprojectwebapi20240311113118.azurewebsites.net/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchEmployees = async () => {
  try {
    const response = await api.get("/employees/1");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
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

export const LoginCheck = (userNameP, passwordP) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://hrprojectwebapi20240311113118.azurewebsites.net/api/account/",
        {
          userName: userNameP,
          password: passwordP,
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
    const response = await axios.post("/api/user/check", { email });
    return response.data.exists; // Backend'den gelen veriye göre email varsa true, yoksa false döner
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

async function fetchAllPermission() {
  try {
    const response = await axios.get(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Permission"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advance:", error);
    return []; // Hata durumunda boş bir dizi döndürüyoruz
  }
}

export { fetchAllPermission };

async function fetchAllAdvances() {
  try {
    const response = await axios.get(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Advances"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advance:", error);
    return []; // Hata durumunda boş bir dizi döndürüyoruz
  }
}

export { fetchAllAdvances };

async function fetchAllExpenses() {
  try {
    const response = await axios.get(
      "https://hrprojectwebapi20240311113118.azurewebsites.net/api/Expenses"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
}

export { fetchAllExpenses };

export const fetchManager = async () => {
  try {
    const response = await api.get("/manager/3");
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

export default api;
