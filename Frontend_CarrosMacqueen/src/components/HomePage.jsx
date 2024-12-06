import React from 'react';
import Header from './Header';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <Header />
      <Navbar />
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
  },
};

export default HomePage;
