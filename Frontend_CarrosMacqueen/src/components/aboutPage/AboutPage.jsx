import React from 'react';
import Header from '../Header';
import Navbar from '../Navbar';
import About from './About';

const AboutPage = () => {
  return (
    <div style={styles.container}>
      <Header />
      <Navbar />
      <About/>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
  },
};

export default AboutPage;
