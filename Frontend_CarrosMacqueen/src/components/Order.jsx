import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Order = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState('');
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCpf = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          setError('Usuário não está logado');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/clients/${username}`);
        setCpf(response.data.CPF);
      } catch (err) {
        setError('Erro ao buscar o CPF do cliente');
        console.error(err);
      }
    };

    fetchCpf();
  }, []);

  useEffect(() => {
    if (!cpf) return;

    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${cpf}`);
        setCart(response.data);
      } catch (err) {
        setError('Erro ao buscar o carrinho');
        console.error(err);
      }
    };

    fetchCart();
  }, [cpf]);

  const handlePaymentClick = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await axios.get(`http://localhost:5000/api/clients/${username}`);
      const client = response.data;

      console.log('Client data:', client);

      if (client.cards && client.cards.length > 0) {
        console.log('Client has cards:', client.cards);
        navigate('/compra-finalizada');
      } else {
        console.log('Client has no cards');
        navigate('/payment-method');
      }
    } catch (err) {
      setError('Erro ao verificar os cartões do cliente');
      console.error('Erro ao verificar os cartões do cliente', err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!cart) {
    return <p>Carregando...</p>;
  }

  const totalPrice = cart.items.reduce((total, item) => total + item.car.price * item.quantity, 0);

  return (
    <div style={styles.orderContainer}>
      <h1 style={styles.heading}>Resumo do Pedido</h1>
      {cart.items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul style={styles.orderList}>
          {cart.items.map((item) => (
            <li key={item.car._id} style={styles.orderItem}>
              <img src={item.car.image} alt={item.car.name} style={styles.carImage} />
              <div style={styles.carDetails}>
                <h2 style={styles.carName}>{item.car.name}</h2>
                <p style={styles.carPrice}>Preço: {item.car.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p style={styles.carQuantity}>Quantidade: {item.quantity}</p>
                <p style={styles.itemTotal}>Total: {(item.car.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h2 style={styles.totalPrice}>Preço Total: {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
      <button onClick={handlePaymentClick} style={styles.paymentButton}>Confirmar Pedido</button>
    </div>
  );
};

const styles = {
  orderContainer: {
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
  orderList: {
    listStyle: 'none',
    padding: '0',
  },
  orderItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  carImage: {
    width: '100px',
    height: 'auto',
    borderRadius: '10px',
    marginRight: '20px',
  },
  carDetails: {
    textAlign: 'left',
  },
  carName: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  carPrice: {
    fontSize: '1.2rem',
    color: '#666',
  },
  carQuantity: {
    fontSize: '1.2rem',
    color: '#666',
  },
  itemTotal: {
    fontSize: '1.2rem',
    color: '#666',
  },
  totalPrice: {
    fontSize: '1.8rem',
    color: '#333',
    marginTop: '20px',
  },
  paymentButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Order;