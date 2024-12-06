import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default AppRoutes;
