import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import CarListPage from '../components/CarListPage';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/cars" element={<CarListPage />}/>
  </Routes>
);

export default AppRoutes;
