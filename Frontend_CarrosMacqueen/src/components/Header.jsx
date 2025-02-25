import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={styles.header}>
      <img src="logo.jpeg" alt="Logo" style={styles.logo} />
      <div style={styles.contactInfo}>
        <p style={styles.contactItem}>
          Endereço: Araucárias, 123, Brasília, DF
        </p>
        <p style={styles.contactItem}>Telefone: +55 11 99999-9999</p>
        <p style={styles.contactItem}>
          Email:{" "}
          <a
            href="mailto:carrosmacqueenof@gmail.com"
            style={styles.contactLink}
          >
            carrosmacqueenof@gmail.com
          </a>
        </p>
        <Link to="/login" style={styles.contactItem}>
          <button style={styles.button}>Login</button>
        </Link>
        <Link to="/Cadastro" style={styles.contactItem}>
          <button style={styles.button}>Cadastro</button>
        </Link>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 20px",
    backgroundColor: "#333",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    width: "150px",
    borderRadius: "50%",
  },
  contactInfo: {
    fontSize: "1.5rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
  },
  contactItem: {
    margin: "0 10px",
    fontSize: "23px",
    color: "#fff",
  },
  contactLink: {
    color: "#007bff",
    textDecoration: "none",
  },
  button: {
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    padding: "10px 20px",
    fontSize: "18px",
    margin: "0 15px",
    cursor: "pointer",
    borderRadius: "5px",
    textDecoration: "none",
  },
};

export default Header;
