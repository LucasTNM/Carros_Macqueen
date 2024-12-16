import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>Página Inicial</Link>
        </li>
        <li>
          <Link to="/cars" style={styles.link}>Estoque</Link>
        </li>
        <li>
          <Link to="/about" style={styles.link}>Sobre Nós</Link>
        </li>
        <li>
          <Link to="/payment" style={styles.link}>Carrinho</Link>
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
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    margin: '0 15px',
  },
};

export default Navbar;
