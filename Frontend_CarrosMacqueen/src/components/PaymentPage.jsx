import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar"; 
import Header from "./Header";

function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState('Crédito');
    const [fullName, setFullName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const navigate = useNavigate(); 

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const username = localStorage.getItem('username');
            const clientResponse = await axios.get(`https://carros-macqueen-backend.onrender.com/api/clients/email/${username}`);
            const clientCPF = clientResponse.data.CPF;

            const cardData = {
                cardType: paymentMethod,
                cardNumber,
                cardExpiry,
                cardCVV,
                fullName,
                clientCPF
            };

            await axios.post('https://carros-macqueen-backend.onrender.com/api/cards', cardData);
            navigate('/compra-finalizada');
        } catch (error) {
            console.error('Erro ao adicionar cartão', error);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
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
                    <input 
                        type="text" 
                        placeholder="Digite o nome do titular" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        style={{ width: '100%', padding: '5px', border: '1px solid #000', borderRadius: '4px' }} 
                    />
                </div>
                <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Número do Cartão:
                    </label>
                    <input 
                        type="text" 
                        placeholder="Digite o número do cartão" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
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
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
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
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value)}
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