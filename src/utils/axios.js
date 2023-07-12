import axios from 'axios';

// Crie uma instância do axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api',  // substitua pela URL base da sua API
  timeout: 10000,  // tempo limite em milissegundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicione um interceptor de solicitação
api.interceptors.request.use(config => {
  // Adicione o token de autenticação ao cabeçalho de cada solicitação
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const userID = localStorage.getItem('userID');
  if (userID) {
    config.headers.userID = userID;
  }

  return config;
}, error => {
  // Faça algo com o erro da solicitação
  return Promise.reject(error);
});

// Adicione um interceptor de resposta
api.interceptors.response.use(response => {
  // Faça algo com os dados de resposta
  return response;
}, error => {
  // Faça algo com o erro da resposta
  return Promise.reject(error);
});

// Exporte a instância do axios
export default api;
