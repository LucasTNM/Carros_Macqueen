import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import SearchFilter from './SearchFilter';

const CarListPage = () => {
  const [cars, setCars] = useState([]); // Lista completa de carros
  const [loading, setLoading] = useState(true);
  const [filteredCars, setFilteredCars] = useState([]); // Lista filtrada de carros

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/cars');
        setCars(response.data); // Atualiza a lista completa
        setFilteredCars(response.data); // Inicializa a lista filtrada com todos os carros
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar os carros', error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

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
      backgroundColor: '#333',
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
    carInfo: {
      color: 'white',
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

  return (
    <div style={styles.container}>
      <h1>Confira nosso estoque:</h1>
      <SearchFilter cars={cars} onFilter={setFilteredCars} />
      {loading ? (
        <p>Carregando carros...</p>
      ) : (
        <div style={styles.carList}>
          {filteredCars.length === 0 ? (
            <p>Nenhum carro encontrado.</p>
          ) : (
            filteredCars.map((car) => (
              <div style={styles.carItem} key={car._id}>
                <img
                  src={car.image} // Caminho da imagem no backend
                  alt={car.name}
                  style={styles.carImage}
                />
                <div style={styles.carDetails}>
                  <h3 style ={styles.carInfo}>{car.name}</h3>
                  <p style ={styles.carInfo}>Modelo: {car.class}</p>
                  <p style ={styles.carInfo}>Preço: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.price)}</p>
                  <Link to={`/car/${car.name}`} style={styles.carLink}>
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
