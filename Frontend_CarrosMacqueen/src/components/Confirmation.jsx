import React from 'react';

function PagamentoResumo() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      {/* Área superior com a imagem */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#aaaaff',
            border: '1px solid #000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Espaço para a imagem */}
          <span style={{ color: '#666' }}>X</span>
        </div>
      </div>

      {/* Área do resumo e valor */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#ccc',
          height: '150px',
          padding: '10px',
          marginBottom: '20px',
          alignItems: 'center',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>
          Resumo do pedido: <span style={{ fontWeight: 'normal' }}>Bugatti EB 110 SS</span>
        </div>
        <div style={{ fontWeight: 'bold' }}>
          Valor a ser pago: <span style={{ fontWeight: 'normal' }}>R$ 5.000.000,00</span>
        </div>
      </div>

      {/* Segunda área com valor e cálculo */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#ccc',
          height: '80px',
          padding: '10px',
          alignItems: 'center',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>
          Valor a ser pago: <span style={{ fontWeight: 'normal' }}>R$ 5.000.000,00</span>
        </div>
        <div style={{ fontWeight: 'bold' }}>
          Cálculo do total: <span style={{ fontWeight: 'normal' }}>R$ 5.000.000,00</span>
        </div>
      </div>
    </div>
  );
}

export default PagamentoResumo;
