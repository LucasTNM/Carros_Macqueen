import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState('');
  const [cpf, setCpf] = useState('');

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

  if (error) {
    return <p>{error}</p>;
  }

  if (!cart) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={styles.cartContainer}>
      <h1 style={styles.heading}>Carrinho de Compras</h1>
      {cart.items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul style={styles.cartList}>
          {cart.items.map((item) => (
            <li key={item.car._id} style={styles.cartItem}>
              <img src={item.car.image} alt={item.car.name} style={styles.carImage} />
              <div style={styles.carDetails}>
                <h2 style={styles.carName}>{item.car.name}</h2>
                <p style={styles.carQuantity}>Quantidade: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  cartContainer: {
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
  cartList: {
    listStyle: 'none',
    padding: '0',
  },
  cartItem: {
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
  carQuantity: {
    fontSize: '1.2rem',
    color: '#666',
  },
};

export default Cart;