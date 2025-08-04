import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarDetails = () => {
  const { carName } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`https://carros-macqueen-backend.onrender.com/api/cars/name/${encodeURIComponent(carName)}`);
        setCar(response.data);
      } catch (err) {
        setError('Erro ao buscar informações do carro');
        console.error(err);
      }
    };

    fetchCarDetails();
  }, [carName]);

  const handleBuyClick = async () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username');

    if (!isAuthenticated || !username) {
      alert('Você será redirecionado para a página de login. Por favor, faça login novamente.');
      console.log('Redirecionando para login...');
      navigate('/login');
      return;
    }

    try {
      setLoading(true); // Inicia o carregamento
      const response = await axios.get(`https://carros-macqueen-backend.onrender.com/api/clients/email/${username}`);
      const client = response.data;

      if (client.cards && client.cards.length > 0) {
        console.log('Cliente possui cartões, adicionando ao carrinho...');
        console.log('username:', username);
        console.log('carName:', car.name);

        const postResponse = await axios.post('https://carros-macqueen-backend.onrender.com/api/cart/add', {
          username,
          carName: car.name,
        });

        navigate('/resumo-pedido');
      } else {
        navigate('/payment-method');
      }
    } catch (error) {
      console.error('Erro ao verificar os cartões do cliente', error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  const handleAddToCartClick = async () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username');

    if (!isAuthenticated || !username) {
      alert('Você será redirecionado para a página de login. Por favor, faça login novamente.');
      console.log('Redirecionando para login...');
      navigate('/login');
      return;
    }

    try {
      setLoading(true); // Inicia o carregamento

      const response = await axios.post('https://carros-macqueen-backend.onrender.com/api/cart/add', {
        username,
        carName: car.name,
      });

      console.log('Resposta da requisição POST:', response);
    } catch (error) {
      console.error('Erro ao adicionar carro ao carrinho', error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!car) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={styles.carDetailsContainer}>
      <h1 style={styles.heading}>{car.name}</h1>
      <img src={car.image} alt={car.name} style={styles.carImage} />
      <p style={styles.description}>{car.description}</p>
      <ul style={styles.detailsList}>
        <li style={styles.detailItem}>
          Preço: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.price)}
        </li>
        <li style={styles.detailItem}>Modelo: {car.class}</li>
        <li style={styles.detailItem}>Ano: {car.year}</li>
        <li style={styles.detailItem}>{car.details}</li>
      </ul>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleBuyClick} disabled={loading}>
          {loading ? 'Processando...' : 'Comprar'}
        </button>
        <button style={styles.button} onClick={handleAddToCartClick} disabled={loading}>
          {loading ? 'Processando...' : 'Guardar no Carrinho'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  carDetailsContainer: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  carImage: {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '20px',
  },
  detailsList: {
    listStyle: 'none',
    padding: '0',
  },
  detailItem: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px', // Espaçamento entre os botões
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CarDetails;