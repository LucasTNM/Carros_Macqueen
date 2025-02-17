import React from "react";

const About = () => {
  return (
    <div style={styles.about}>
      <div style={styles.contactInfo}>
        <h1 style={styles.heading}>Um pouco sobre nós</h1>
        <p style={styles.text}>
          Olá! Somos Lucas, Vitor e Pedro, três amigos apaixonados por carros
          raros desde a infância. Nossa jornada começou quando éramos crianças e
          nossos pais nos levaram para uma exposição de carros clássicos. Desde
          então, colecionar e restaurar carros se tornou nossa maior paixão.
        </p>
        <p style={styles.text}>
          Ao longo dos anos, adquirimos uma vasta coleção de carros raros e
          clássicos, cada um com sua própria história única. Adoramos
          compartilhar nosso conhecimento e experiências com outros entusiastas
          de carros e ajudar a preservar a história automotiva.
        </p>
        <p style={styles.text}>
          Além de colecionar, também organizamos eventos e encontros para outros
          colecionadores e entusiastas. Se você compartilha a mesma paixão por
          carros, adoraríamos ouvir de você!
        </p>
        <p style={styles.text}>
          Contato Whatsapp:{" "}
          <a href="https://wa.me/5561985910132" style={styles.contactLink}>
            61 98591-0132
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  about: {
    color: "black",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  contactInfo: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  text: {
    marginBottom: "1rem",
    lineHeight: "1.6",
  },
  contactLink: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default About;
