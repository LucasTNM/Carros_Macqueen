import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import CarListPage from '../components/CarListPage';
import AboutPage from '../components/aboutPage/AboutPage';
import PaymentPage from '../components/PaymentPage';
import Confirmation from '../components/Confirmation';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Card from '../components/Card';
import Login from '../components/Login/Login';

const AppRoutes = () => {
  const style = {
    cardContainer: {
      display: 'flex', // Usar flexbox para alinhar os cards em linha
      justifyContent: 'center', // Centraliza os cards
      gap: '20px', // Espaço entre os cards
      margin: '10px auto', // Margem do contêiner
      flexWrap: 'wrap', // Permite que os cards quebrem para a próxima linha se necessário
    },
  };

  return (
    <Routes>
      <Route path="/" element={
        <div>
          <Header />
          <Navbar />
          <HomePage />
          <div style={style.cardContainer}>
            <Card carName="Mustang GTX350" />
            <Card carName="Bugatti EB 110 SS" />
          </div>
        </div>
      } />
      <Route path="/cars" element={<div><Header/><Navbar/><CarListPage /></div>} />
      <Route path="/about" element={<div><Header/><Navbar/><AboutPage /></div>} />
      <Route path="/payment" element={<div><Header/><Navbar/><PaymentPage /></div>} />
      <Route path="/confirmation" element={<div><Header/><Navbar/><Confirmation /></div>} />
      <Route path="/login" element={<div><Header/><Navbar/><Login /></div>} />
    </Routes>
  );
};

export default AppRoutes;
