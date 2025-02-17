import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Card() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/cars/class');
        setClasses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar as classes', error);
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      textAlign: 'center',
    },
    p: {
      color: 'black',
    },
    classList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      justifyItems: 'center',
    },
    classItem: {
      backgroundColor: '#333',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '300px',
      overflow: 'hidden',
      textAlign: 'left',
      padding: '1rem',
      color: 'white',
    },
    classLink: {
      display: 'inline-block',
      marginTop: '1rem',
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Classes de Carros</h1>
      {loading ? (
        <p style ={styles.p}>Carregando classes...</p>
      ) : (
        <div style={styles.classList}>
          {classes.length === 0 ? (
            <p style ={styles.p}>Nenhuma classe encontrada.</p>
          ) : (
            classes.map((car, index) => (
              <div style={styles.classItem} key={index}>
                <h3>{carClass}</h3>
                <Link to={`/class/${car.class}`} style={styles.classLink}>
                  Ver Carros
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Card;