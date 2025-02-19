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
    cards: "",
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
        cards: "",
      });

      navigate("/"); // Redireciona após o cadastro bem-sucedido
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao realizar cadastro.");
    }
  };

  return (
    <div className="cadastro-container">
      <form className="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          holder="Nome"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="CPF"
          holder="CPF"
          value={formData.CPF}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          holder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="phone"
          holder="Telefone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Input
          type="date"
          name="DateOfBirth"
          holder="Data de Nascimento"
          value={formData.DateOfBirth}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          holder="Senha"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="address"
          holder="Endereço"
          value={formData.address}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="cards"
          holder="Cartão (opcional)"
          value={formData.cards}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
