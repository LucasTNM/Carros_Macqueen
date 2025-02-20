import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./cadastro.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    name: "",
    CPF: "",
    email: "",
    phone: "",
    DateOfBirth: "",
    password: "",
    address: "",
    cards: [],
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Atualiza o estado conforme o usuário preenche os campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores

    try {
      const response = await axios.post(
        "http://localhost:5000/api/clients/cadastro",
        formData
      );

      localStorage.setItem("token", response.data.token);
      setFormData({
        // Limpa os campos após cadastro
        name: "",
        CPF: "",
        email: "",
        phone: "",
        DateOfBirth: "",
        password: "",
        address: "",
        cards: [],
      });

      navigate("/"); // Redireciona após o cadastro bem-sucedido
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao realizar cadastro.");
    }
  };

  return (
    <div className="cadastro-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="CPF"
          placeholder="CPF"
          value={formData.CPF}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="date"
          name="DateOfBirth"
          placeholder="Data de Nascimento"
          value={formData.DateOfBirth}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Endereço"
          value={formData.address}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;