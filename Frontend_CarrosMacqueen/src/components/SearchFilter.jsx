import React, { useState } from "react";

const SearchFilter = ({ cars, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false); // Estado para foco

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filtra os carros com base no nome
    const filteredCars = cars.filter((car) =>
      car.name.toLowerCase().includes(value.toLowerCase())
    );

    // Passa os carros filtrados para o callback
    onFilter(filteredCars);
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "1.5rem",
    },
    input: {
      width: "100%",
      maxWidth: "400px", // Define uma largura máxima
      padding: "0.8rem 1rem",
      fontSize: "1rem",
      border: "1px solid #ddd",
      borderRadius: "25px", // Bordas arredondadas
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Adiciona uma sombra suave
      outline: "none",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      ...(isFocused && {
        border: "1px solid #007bff", // Cor ao focar
        boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)", // Realce ao focar
      }),
    },
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Pesquisar por nome..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.input}
        onFocus={() => setIsFocused(true)} // Ativa o estado de foco
        onBlur={() => setIsFocused(false)} // Desativa o estado de foco
      />
    </div>
  );
};

export default SearchFilter;
