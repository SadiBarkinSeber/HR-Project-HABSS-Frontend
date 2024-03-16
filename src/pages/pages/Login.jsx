import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginCheck } from "../api/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async () => {
    try {
      const status = await LoginCheck(username, password);
      if (status === 200) {
        navigateTo("/emp");
      } else if (status === 401) {
        setError("Hatalı kullanıcı adı veya parola. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Parola"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Giriş yap</button>
    </div>
  );
};

export default Login;
