import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./cadastro.css";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [CPF, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [cards, setCards] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5173/api/clients/cadastro",
        { name, CPF, email, phone, DateOfBirth, password, address, cards }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/"); // Redireciona para a página inicial após o cadastro bem-sucedido
    } catch (err) {
      setError("Erro ao realizar cadastro. Tente novamente.");
    }
  };

  return (
    <div className="cadastro-container">
      <form className="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          holder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          holder="CPF"
          value={CPF}
          onChange={(e) => setCPF(e.target.value)}
        />
        <Input
          type="email"
          holder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          holder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          type="date"
          holder="Data de Nascimento"
          value={DateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <Input
          type="password"
          holder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          holder="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          type="text"
          holder="Cartão (opcional)"
          value={cards}
          onChange={(e) => setCards(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
