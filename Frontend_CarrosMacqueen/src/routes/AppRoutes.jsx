import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import CarListPage from "../components/CarListPage";
import AboutPage from "../components/aboutPage/AboutPage";
import PaymentPage from "../components/PaymentPage";
import Confirmation from "../components/Confirmation";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Card from "../components/Card";
import Login from "../components/Login/Login";
import Cadastro from "../components/Cadastro/Cadastro";
import PasswordReset from "../components/Redefinir-senha/PasswordReset";
import ResetPassword from "../components/Redefinir-senha/ResetPassword";
import VerifyResetCode from "../components/Redefinir-senha/verifyResetCode";
import CarDetails from "../components/CarDetails";
import Cart from "../components/Cart";
import Order from "../components/Order"
import ThanksPage from "../components/ThanksPage";

const style = {
  cardContainer: {
    display: "flex", // Usar flexbox para alinhar os cards em linha
    justifyContent: "center", // Centraliza os cards
    gap: "20px", // Espaço entre os cards
    margin: "auto 10px", // Margem do contêiner
    flexWrap: "wrap", // Permite que os cards quebrem para a próxima linha se necessário
  },
};

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <div>
          <Header />
          <Navbar />
          <HomePage />
          <div style={style.cardContainer}>
            <Card carName="McLaren F1 LM" />
            <Card carName="Icona Vulcano Titanium" />
          </div>
        </div>
      }
    />
    <Route
      path="/cars"
      element={
        <div>
          <Header />
          <Navbar />
          <CarListPage />
        </div>
      }
    />
    <Route
      path="/about"
      element={
        <div>
          <Header />
          <Navbar />
          <AboutPage />
        </div>
      }
    />
    <Route
      path="/payment-method"
      element={
        <div>
          <Header />
          <Navbar />
          <PaymentPage />
        </div>
      }
    />
    <Route 
      path="/Carrinho"
      element={
        <div>
          <Header />
          <Navbar />
          <Cart />
        </div>
      }
    />
    <Route
      path="/resumo-pedido"
      element={
        <div>
          <Header />
          <Navbar />
          <Order />
        </div>
      }
    />
    <Route
      path="/compra-finalizada"
      element={
        <div>
          <ThanksPage />
        </div>
      }
    />
    <Route
      path="/login"
      element={
        <div>
          <Header />
          <Navbar />
          <Login />
        </div>
      }
    />
    <Route
      path="/cadastro"
      element={
        <div>
          <Header />
          <Navbar />
          <Cadastro />
        </div>
      }
    />
    <Route
      path="/password-reset"
      element={
        <div>
          <Header />
          <Navbar />
          <PasswordReset />
        </div>
      }
    />
    <Route
      path="/verify-reset-code"
      element={
        <div>
          <Header />
          <Navbar />
          <VerifyResetCode />
        </div>
      }
    />
    <Route
      path="/reset-password/:token"
      element={
        <div>
          <Header />
          <Navbar />
          <ResetPassword />
        </div>
      }
    />
    <Route
      path="/cars/:carName"
      element={
        <div>
          <Header />
          <Navbar />
          <CarDetails />
        </div>
      }
    />
  </Routes>
);

export default AppRoutes;