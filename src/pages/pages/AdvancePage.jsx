import React, { useState } from 'react';

const Advance = () => {
  // State tanımlamaları
  const [advanceType, setAdvanceType] = useState('');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  // Avans türü seçenekleri
  const advanceTypeOptions = ['Bireysel', 'Kurumsal'];

  // Para birimi seçenekleri
  const currencyOptions = ['TL', 'USD', 'EUR', 'GBP'];

  // Form gönderme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form verilerini işleme
    const advanceObject = createAdvanceObject(advanceType, currency, amount, description);
    console.log(advanceObject);
    // Formu sıfırla
    resetForm();
  };

  // Formu sıfırlama işlemi
  const resetForm = () => {
    setAdvanceType('');
    setCurrency('');
    setAmount('');
    setDescription('');
  };

  const createAdvanceObject = (advanceType, currency, amount, description) => {

    const advance = {
      AdvanceType: advanceType,
      Currency: currency,
      Amount: amount,
      Description: description
    }

    return advance;

  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Avans Talebi Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="advanceType" style={{ marginRight: '10px' }}>Avans Türü:</label>
          <select
            id="advanceType"
            value={advanceType}
            onChange={(e) => setAdvanceType(e.target.value)}
            style={{ padding: '5px' }}
          >
            <option value="">Seçiniz</option>
            {advanceTypeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="currency" style={{ marginRight: '10px' }}>Para Birimi:</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{ padding: '5px' }}
          >
            <option value="">Seçiniz</option>
            {currencyOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="amount" style={{ marginRight: '10px' }}>Tutar:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description" style={{ marginRight: '10px' }}>Açıklama:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: '5px' }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Onaya Gönder</button>
          <button type="button" onClick={resetForm} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Temizle</button>
        </div>
      </form>
    </div>
  );
};

export default Advance;