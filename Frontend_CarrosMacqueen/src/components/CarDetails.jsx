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
        const response = await axios.get(`http://localhost:5000/api/cars/${carName}`);
        setCar(response.data);
      } catch (err) {
        setError('Erro ao buscar informações do carro');
        console.error(err);
      }
    };

    fetchCarDetails();
  }, [carName]);

  const handleBuyClick = () => {
    navigate('/payment');
  };

  const handleAddToCartClick = async () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Verifica se o usuário está autenticado
    const username = localStorage.getItem('username'); // Obtém o email do usuário do localStorage

    if (!isAuthenticated || !username) {
      console.log('Redirecionando para login...');
      navigate('/login'); // Redireciona para a página de login se não estiver autenticado
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        username,
        carName: car.name,
      });
      console.log('Resposta da requisição:', response);
      alert('Carro adicionado ao carrinho!');
    } catch (error) {
      console.error('Erro ao adicionar carro ao carrinho', error);
      alert('Erro ao adicionar carro ao carrinho');
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
        <li style={styles.detailItem}>Preço: {car.price}</li>
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
    maxWidth: '600px', // Define a largura máxima da imagem
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