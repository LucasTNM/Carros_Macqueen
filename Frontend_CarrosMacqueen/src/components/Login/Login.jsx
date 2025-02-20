import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Verifica se já existe um token salvo no localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login"); // Redireciona para a tela de login
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/clients/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Email ou senha inválidos");
    }
  };

  const handlePasswordReset = () => {
    navigate("/password-reset");
  };

  return (
    <div className="login-container">
  {isLoggedIn ? (
    <div>
      <p className="message">Você já está em uma conta.</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  ) : (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
      <button type="button" onClick={handlePasswordReset}>Esqueceu sua senha?</button>
    </form>
  )}
</div>

  );
};

export default Login;
