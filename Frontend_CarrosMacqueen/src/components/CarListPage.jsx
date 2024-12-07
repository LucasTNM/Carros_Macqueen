import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const CarListPage = () => {
  const [cars, setCars] = useState([]); // Estado para armazenar os carros
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    // Função para buscar os carros do backend
    const fetchCars = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/cars'); // Endpoint para pegar os carros
        setCars(response.data.cars); // Atualiza o estado com os dados dos carros
        setLoading(false); // Define como não carregando
      } catch (error) {
        console.error('Erro ao carregar os carros', error);
        setLoading(false); // Define como não carregando em caso de erro
      }
    };

    fetchCars(); // Chama a função para buscar os carros
  }, []); // O array vazio garante que a busca seja feita apenas uma vez, após o primeiro render

  // Estilos para a página
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      textAlign: 'center',
    },
    carList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      justifyItems: 'center',
    },
    carItem: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '300px',
      overflow: 'hidden',
      textAlign: 'left',
      padding: '1rem',
    },
    carImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
    },
    carDetails: {
      marginTop: '1rem',
    },
    carLink: {
      display: 'inline-block',
      marginTop: '1rem',
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    carLinkHover: {
      textDecoration: 'underline',
    },
  };

  // Renderiza a página de listagem de carros
  return (
    <div style={styles.container}>
      <h1>Lista de Carros</h1>
      {loading ? (
        <p>Carregando carros...</p>
      ) : (
        <div style={styles.carList}>
          {cars.length === 0 ? (
            <p>Nenhum carro encontrado.</p>
          ) : (
            cars.map((car) => (
              <div style={styles.carItem} key={car._id}>
                <img
                  src={`http://localhost:5000${car.image}`} // Caminho da imagem no backend
                  alt={car.name}
                  style={styles.carImage}
                />
                <div style={styles.carDetails}>
                  <h3>{car.name}</h3>
                  <p>Modelo: {car.model}</p>
                  <p>Preço: R${car.price}</p>
                  <Link to={`/car/${car._id}`} style={styles.carLink}>
                    Detalhes
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CarListPage;
