import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Confira nossa seleção de carros!</h1>
      <p style={styles.paragraph}>
        Encontre o carro dos seus sonhos com a nossa incrível 
        seleção de veículos de alta performance e luxo.
      </p>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '40px',
  },
};

export default HomePage;
