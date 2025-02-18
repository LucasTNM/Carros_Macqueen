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

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<div><Header/><Navbar/><HomePage/><Card /></div>} />
    <Route path="/cars" element={<div><Header/><Navbar/><CarListPage /></div>}/>
    <Route path="/about" element={<div><Header/><Navbar/><AboutPage /></div>}/>
    <Route path="/payment" element={<div><Header/><Navbar/><PaymentPage /></div>} />
    <Route path="/confirmation" element={<div><Header/><Navbar/><Confirmation /></div>} />
    <Route path="/login" element={<div><Header/><Navbar/><Login /></div>} />
  </Routes>
);

export default AppRoutes;
