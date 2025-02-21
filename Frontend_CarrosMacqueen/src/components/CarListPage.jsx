import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../api";
import SearchFilter from "./SearchFilter";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CarListPage = () => {
  const [cars, setCars] = useState([]); // Lista completa de carros
  const [loading, setLoading] = useState(true);
  const [filteredCars, setFilteredCars] = useState([]); // Lista filtrada de carros
  const query = useQuery();
  const carClass = query.get("class");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("https://carros-macqueen-backend.onrender.com/api/cars");
        setCars(response.data); // Atualiza a lista completa
        setFilteredCars(response.data); // Inicializa a lista filtrada com todos os carros
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar os carros", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    if (carClass) {
      setFilteredCars(cars.filter((car) => car.class === carClass));
    } else {
      setFilteredCars(cars);
    }
  }, [carClass, cars]);

  // Estilos para a página
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
      textAlign: "center",
    },
    carList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      justifyItems: "center",
    },
    carItem: {
      backgroundColor: "#333",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "300px",
      overflow: "hidden",
      textAlign: "left",
      padding: "1rem",
    },
    carImage: {
      width: "100%",
      height: "200px", // Define a altura fixa para as imagens
      objectFit: "cover", // Garante que a imagem se ajuste ao contêiner sem distorção
      borderRadius: "8px",
    },
    carDetails: {
      marginTop: "1rem",
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
    carLinkHover: {
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <h1>Confira nosso estoque:</h1>
      <SearchFilter cars={cars} onFilter={setFilteredCars} />
      {loading ? (
        <p>Carregando carros...</p>
      ) : (
        <div style={styles.carList}>
          {filteredCars.length === 0 ? (
            <h2>Nenhum carro encontrado.</h2>
          ) : (
            filteredCars.map((car) => (
              <div style={styles.carItem} key={car._id}>
                <img
                  src={car.image} // Caminho da imagem no backend
                  alt={car.name}
                  style={styles.carImage}
                />
                <div style={styles.carDetails}>
                  <h3 style={styles.carInfo}>{car.name}</h3>
                  <p style={styles.carInfo}>Modelo: {car.class}</p>
                  <p style={styles.carInfo}>
                    Preço:{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(car.price)}
                  </p>
                  <Link to={`/cars/${car.name}`} style={styles.carLink}>
                    Ver detalhes do carro
                  </Link>
                  <Link
                    to={`/cars?class=${car.class}`}
                    style={styles.carLink}
                  >
                    Ir para Carros Esportivos
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CarListPage;