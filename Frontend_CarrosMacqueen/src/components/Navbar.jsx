import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>
            <button style={styles.button}>Página Inicial</button>
          </Link>
        </li>
        <li>
          <Link to="/cars" style={styles.link}>
            <button style={styles.button}>Estoque</button>
          </Link>
        </li>
        <li>
          <Link to="/about" style={styles.link}>
            <button style={styles.button}>Sobre Nós</button>
          </Link>
        </li>
        <li>
          <Link to="/Carrinho" style={styles.link}>
            <button style={styles.button}>Carrinho</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#444',
    padding: '10px 20px',
  },
  navLinks: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '18px',
    margin: '0 15px',
    cursor: 'pointer',
    borderRadius: '5px',
    textDecoration: 'none',
  },
};

export default Navbar;