import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import CarListPage from '../components/CarListPage';
import AboutPage from '../components/aboutPage/AboutPage';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/cars" element={<CarListPage />}/>
    <Route path="/about" element={<AboutPage />}/>
  </Routes>
);

export default AppRoutes;
