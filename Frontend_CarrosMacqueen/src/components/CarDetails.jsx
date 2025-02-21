import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarDetails = () => {
  const { carName } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`https://carros-macqueen-backend.onrender.com/api/cars/${carName}`);
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
      console.log('Redirecionando para login...');
      navigate('/login');
      return;
    }

    try {
      console.log('Verificando cartões do cliente...');
      const response = await axios.get(`https://carros-macqueen-backend.onrender.com/api/clients/${username}`);
      const client = response.data;

      if (client.cards && client.cards.length > 0) {
        console.log('Cliente possui cartões, adicionando ao carrinho...');
        await axios.post('https://carros-macqueen-backend.onrender.com/api/cart/add', {
          username,
          carName: car.name,
        });
        navigate('/resumo-pedido');
      } else {
        console.log('Cliente não possui cartões, redirecionando para método de pagamento...');
        navigate('/payment-method');
      }
    } catch (error) {
      console.error('Erro ao verificar os cartões do cliente', error);
    }
  };

  const handleAddToCartClick = async () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username');

    if (!isAuthenticated || !username) {
      console.log('Redirecionando para login...');
      navigate('/login');
      return;
    }

    try {
      console.log('Adicionando carro ao carrinho...');
      const response = await axios.post('https://carros-macqueen-backend.onrender.com/api/cart/add', {
        username,
        carName: car.name,
      });
      console.log('Resposta da requisição:', response);
    } catch (error) {
      console.error('Erro ao adicionar carro ao carrinho', error);
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
      <button onClick={handleBuyClick}>Comprar</button>
      <button onClick={handleAddToCartClick}>Guardar no Carrinho</button>
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
};

export default CarDetails;