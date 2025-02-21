import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ThanksPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await axios.get(`https://carros-macqueen-backend.onrender.com/api/clients/${username}`);
      const cpf = response.data.CPF;

      await axios.delete(`https://carros-macqueen-backend.onrender.com/api/cart/${cpf}`);
      navigate('/');
    } catch (error) {
      console.error('Erro ao limpar o carrinho', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Obrigado pela sua compra!</h1>
      <p style={styles.message}>Agradecemos por escolher nossa loja. Seu pedido foi processado com sucesso.</p>
      <button onClick={handleBackToHome} style={styles.button}>Voltar à Página Inicial</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ThanksPage;