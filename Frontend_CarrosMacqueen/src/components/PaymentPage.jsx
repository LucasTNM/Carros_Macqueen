import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState('Crédito');
    const navigate = useNavigate(); 

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = () => {
        
        navigate('/Confirmation');
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            
            <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #000' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: '#888', display: 'inline-block' }}></div>
                <nav>
                    <a href="#catalogo" style={{ margin: '0 15px', textDecoration: 'none', color: 'black' }}>Catálogo</a>
                    <a href="#contato" style={{ margin: '0 15px', textDecoration: 'none', color: 'black' }}>Contato</a>
                </nav>
                <input type="text" placeholder="Pesquisar" style={{ padding: '5px', border: '1px solid #000', borderRadius: '4px' }} disabled />
            </header>

            <main style={{ backgroundColor: '#ccc', margin: '50px auto', padding: '20px', width: '300px', borderRadius: '8px' }}>
                <h2>Pagamento</h2>
                <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Método de pagamento:
                    </label>
                    <select 
                        value={paymentMethod} 
                        onChange={handlePaymentMethodChange} 
                        style={{ width: '100%', padding: '5px', border: '1px solid #000', borderRadius: '4px' }}
                    >
                        <option value="Crédito">Crédito</option>
                        <option value="Débito">Débito</option>
                    </select>
                </div>
                <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Nome Completo do Titular:
                    </label>
                    <input type="text" placeholder="Digite o nome do titular" style={{ width: '100%', padding: '5px', border: '1px solid #000', borderRadius: '4px' }} />
                </div>
                <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Número do Cartão:
                    </label>
                    <input 
                        type="text" 
                        placeholder="Digite o número do cartão" 
                        style={{ width: '100%', padding: '5px', border: '1px solid #000', borderRadius: '4px' }} 
                    />
                </div>
                <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Validade:
                    </label>
                    <input 
                        type="text" 
                        placeholder="MM/AA" 
                        style={{ width: '100%', padding: '5px', border: '1px solid #000', borderRadius: '4px' }} 
                    />
                </div>
                <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Código de Segurança:
                    </label>
                    <input 
                        type="text" 
                        placeholder="CVV" 
                        style={{ width: '100%', padding: '5px', border: '1px solid #000', borderRadius: '4px' }} 
                    />
                </div>
                
                <button 
                    onClick={handleSubmit} 
                    style={{
                        padding: '10px 20px', 
                        border: '1px solid #000', 
                        borderRadius: '4px', 
                        backgroundColor: '#000', 
                        color: 'white', 
                        cursor: 'pointer',
                        display: 'block',
                        margin: '20px auto' 
                    }}
                >
                    Confirmação
                </button>
            </main>

            <footer style={{ marginTop: '50px', fontSize: '14px', color: '#555' }}>
                Direitos autorais @fazSite
            </footer>
        </div>
    );
}

export default PaymentPage;
