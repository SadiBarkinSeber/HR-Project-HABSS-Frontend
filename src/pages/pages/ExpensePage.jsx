import React, { useState } from 'react';
import { sendFormData } from '../api/api';
import { uploadPhotoAndGetPath } from '../api/api';

function Expense() {
  const [type, setType] = useState('');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [requestDate, setRequestDate] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!type || !currency || !amount || !requestDate || !file) {
      alert('Lütfen tüm alanları doldurun ve bir dosya seçin.');
      return;
    }

    const uploadedFileResponse = await uploadPhotoAndGetPath(file);
    console.log(uploadedFileResponse);
    const fileName = uploadedFileResponse.fileName; // Dosya adını doğru şekilde alıyoruz

    const formData = {
      Type: type,
      Currency: currency,
      Amount: parseFloat(amount),
      RequestDate: requestDate,
      EmployeeId: 1,
      Permission: false,
      ApprovalStatus: "Requested",
      Response: "Başarılı",
      FileName: fileName
    };

    try {
      const data = await sendFormData(formData);
      console.log('API yanıtı:', data);
      resetForm();
    } catch (error) {
      console.error('API isteği başarısız oldu:', error);
    }
  };

  const resetForm = () => {
    setType('');
    setCurrency('');
    setAmount('');
    setRequestDate('');
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert("Bugünden önceki bir tarih seçemezsiniz.");
      setRequestDate(''); // Tarihi sıfırla
    } else {
      setRequestDate(event.target.value);
    }
  };

  return (
    <main className="main">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="type">Talep Nedeni:</label>
            <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Seçiniz</option>
              <option value="İş Seyahatleri">İş Seyahatleri</option>
              <option value="Ofis Malzemeleri">Ofis Malzemeleri</option>
              <option value="Eğitim ve Gelişim">Eğitim ve Gelişim</option>
              <option value="Reklam ve Pazarlama">Reklam ve Pazarlama</option>
              <option value="İş İlişkileri">İş İlişkileri</option>
              <option value="Personel Giderleri">Personel Giderleri</option>
            </select>
          </div>

          <div>
            <label htmlFor="currency">Para Birimi:</label>
            <select id="currency" name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="">Seçiniz</option>
              <option value="TL">Türk Lirası (TL)</option>
              <option value="USD">ABD Doları (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="JPY">Japon Yeni (JPY)</option>
              <option value="GBP">İngiliz Sterlini (GBP)</option>
              <option value="CHF">İsviçre Frangı (CHF)</option>
              <option value="CAD">Kanada Doları (CAD)</option>
            </select>
          </div>

          <div>
            <label htmlFor="amount">Talep Edilen Tutar:</label>
            <input type="number" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Talep Edilen Tutar" />
          </div>

          <div>
            <label htmlFor="requestDate">Talep Tarihi:</label>
            <input type="date" id="requestDate" name="requestDate" value={requestDate} onChange={handleDateChange} min={new Date().toISOString().split('T')[0]} />
          </div>

          <div className="mb-2">
            <label htmlFor="formFileLg" className="form-label">Dosya Yükle:</label>
            <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={handleFileChange} />
          </div>

          <div className="buttons-container">
            <input type="submit" id="submitbtn" name="submit" value="Onaya Gönder" />
            <input type="reset" id="resetbtn" name="submit" value="Sıfırla" onClick={resetForm} />
          </div>
        </form>
      </div>
    </main>
  );
}

export default Expense;
