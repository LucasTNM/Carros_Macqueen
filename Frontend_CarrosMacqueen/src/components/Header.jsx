import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <img src="logo.jpeg" alt="Logo" style={styles.logo} />
      <div style={styles.contactInfo}>
        <p style={styles.contactItem}>Endereço: Rua Exemplo, 123, São Paulo, SP</p>
        <p style={styles.contactItem}>Telefone: +55 11 99999-9999</p>
        <p style={styles.contactItem}>
          Email:{' '}
          <a href="mailto:contato@carrosmacqueen.com" style={styles.contactLink}>
            contato@carrosmacqueen.com
          </a>
        </p>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: '#333',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    width: '150px',
    borderRadius: '50%',
  },
  contactInfo: {
    fontSize:'1.5rem',
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    textAlign: 'left', 
  },
  contactItem: {
    margin: '0 10px',
  },
  contactLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default Header;
