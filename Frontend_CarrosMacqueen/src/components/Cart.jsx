import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
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

        const response = await axios.get(`https://carros-macqueen-backend.onrender.com/api/clients/${username}`);
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
        const response = await axios.get(`https://carros-macqueen-backend.onrender.com/api/cart/${cpf}`);
        setCart(response.data);
      } catch (err) {
        setError('Erro ao buscar o carrinho');
        console.error(err);
      }
    };

    fetchCart();
  }, [cpf]);

  const handleRemoveItem = async (carName) => {
    try {
      await axios.delete(`https://carros-macqueen-backend.onrender.com/api/cart/remove/${cpf}/${encodeURIComponent(carName)}`);
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.car.name !== carName),
      }));
    } catch (err) {
      setError('Erro ao remover item do carrinho');
      console.error(err);
    }
  };

  const handlePaymentClick = () => {
    navigate('/resumo-pedido');
  };

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
        <>
          <ul style={styles.cartList}>
            {cart.items.map((item) => (
              <li key={item.car._id} style={styles.cartItem}>
                <img src={item.car.image} alt={item.car.name} style={styles.carImage} />
                <div style={styles.carDetails}>
                  <h2 style={styles.carName}>{item.car.name}</h2>
                  <p style={styles.carQuantity}>Quantidade: {item.quantity}</p>
                  <button
                    onClick={() => handleRemoveItem(item.car.name)}
                    style={styles.removeButton}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handlePaymentClick} style={styles.paymentButton}>Ir para Pagamento</button>
        </>
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
  removeButton: {
    marginTop: '10px',
    padding: '5px 10px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#ff0000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
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

export default Cart;