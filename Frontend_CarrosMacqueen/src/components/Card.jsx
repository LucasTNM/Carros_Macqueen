import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = ({ carName }) => {
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cars/${carName}`
        );
        setCar(response.data);
      } catch (err) {
        setError("Erro ao buscar informações do carro");
        console.error(err);
      }
    };

    fetchCar();
  }, [carName]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!car) {
    return <p>Carregando...</p>;
  }

  const styles = {
    carItem: {
      backgroundColor: "#333",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      textAlign: "left",
      padding: "1rem",
      width: "300px", // Largura fixa para todos os cards
      height: "350px", // Altura fixa para uniformidade
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      margin: "10px", // Margem para espaçamento entre os cards
    },
    carImage: {
      width: "100%",
      height: "200px", // Altura fixa para a imagem
      objectFit: "cover",
      borderRadius: "8px",
    },
    carDetails: {
      marginTop: "1rem",
      flexGrow: 1,
    },
    carInfo: {
      color: "white",
    },
    carLink: {
      display: "inline-block",
      marginTop: "1rem",
      color: "#007bff",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.carItem} key={car._id}>
      <img src={car.image} alt={car.name} style={styles.carImage} />
      <div style={styles.carDetails}>
        <h3 style={styles.carInfo}>{car.class + "s"}</h3>
        <Link
          to={`http://localhost:5173/cars?class=${car.class}`}
          style={styles.carLink}
        >
          Ir para classe {car.class + "s"}
        </Link>
      </div>
    </div>
  );
};

export default Card;
