import React from 'react';

const About = () => {
  return (
    <about style={styles.about}>
      <div style={styles.contactInfo}>
        <h>Um pouco sobre mim</h>
        <p style={styles.text}>Sou um colecionador de carros.</p>
        <p style={styles.text}>
          Contato Whatsapp:{' '}
          <a style={styles.contactLink}>
            61 985910132
          </a>
        </p>
      </div>
    </about>
  );
};

const styles = {
    about: {
      color : 'black',
    },
    contactInfo: {
      textAlign: 'right',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    text: {
      margin: 'auto',
    },
    contactLink: {
      color: '#fff',
      textDecoration: 'none',
    },
  };
  

export default About;

