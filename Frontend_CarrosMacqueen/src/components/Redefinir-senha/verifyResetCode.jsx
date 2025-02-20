import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './verifyResetCode.css';

const VerifyResetCode = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/clients/verify-reset-code',
        { email, code }
      );

      setMessage('Código verificado com sucesso. Redirecionando para redefinição de senha...');
      setTimeout(() => {
        navigate(`/reset-password/${response.data.token}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao verificar o código.');
    }
  };

  return (
    <div className="verify-reset-code-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Verificar Código de Redefinição</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Código de 4 dígitos"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <button type="submit">Verificar Código</button>
      </form>
    </div>
  );
};

export default VerifyResetCode;