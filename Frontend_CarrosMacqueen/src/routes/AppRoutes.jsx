import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import CarListPage from '../components/CarListPage';
import AboutPage from '../components/aboutPage/AboutPage';
import PaymentPage from '../components/PaymentPage';
import Confirmation from '../components/Confirmation';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/cars" element={<CarListPage />}/>
    <Route path="/about" element={<AboutPage />}/>
    <Route path="/payment" element={<PaymentPage />} />
    <Route path="/confirmation" element={<Confirmation />} />
  </Routes>
);

export default AppRoutes;
