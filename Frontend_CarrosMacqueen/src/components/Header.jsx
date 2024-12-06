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
    fontSize: '30px',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    width: '150px',
    borderRadius: '50%',
  },
  contactInfo: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  contactItem: {
    margin: '5px 0',
  },
  contactLink: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Header;
