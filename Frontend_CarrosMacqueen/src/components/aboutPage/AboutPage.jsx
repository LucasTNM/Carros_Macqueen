import React from 'react';
import About from './About';

const AboutPage = () => {
  return (
    <div style={styles.container}>
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
