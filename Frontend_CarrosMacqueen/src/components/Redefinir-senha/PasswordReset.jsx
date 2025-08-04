import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './passwordReset.css';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post(
        'https://carros-macqueen-backend.onrender.com/api/clients/reset-password',
        { email }
      );

      setMessage('Um link para redefinir sua senha foi enviado para seu email.');
      setTimeout(() => {
        navigate('/verify-reset-code');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao solicitar redefinição de senha.');
    }
  };

  return (
    <div className="password-reset-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Redefinir Senha</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default PasswordReset;