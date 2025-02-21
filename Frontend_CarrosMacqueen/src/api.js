import axios from 'axios';

const api = axios.create({
  baseURL: 'https://carros-macqueen-backend.onrender.com/api', // URL do backend
});

export default api;
