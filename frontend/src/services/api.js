import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANTE: Altere para o IP da sua máquina na rede local
// Para encontrar: abra o terminal e digite "ipconfig" (Windows) ou "ifconfig" (Mac/Linux)
const API_URL = 'http://192.168.3.131:3000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Interceptor para adicionar token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  cadastrar: (dados) => api.post('/auth/cadastrar', dados),
  login: (email, senha) => api.post('/auth/login', { email, senha }),
};

export const progressoService = {
  getProgresso: () => api.get('/progresso'),
  atualizarProgresso: (jogo, faseConcluida) =>
    api.put('/progresso/atualizar', { jogo, faseConcluida }),
  atualizarAvatar: (avatar) => api.put('/progresso/avatar', { avatar }),
};

export const jogosService = {
  getCatalogoJogos: () => api.get('/jogos'),
  getSemaforo: () => api.get('/jogos/semaforo'),
  getToque: () => api.get('/jogos/toque'),
  getPoderDoNao: () => api.get('/jogos/poder-do-nao'),
  getAdultosConfianca: () => api.get('/jogos/adultos-confianca'),
};

export default api;
