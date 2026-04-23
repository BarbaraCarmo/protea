import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Em produção: EXPO_PUBLIC_API_URL é definida em frontend/.env apontando para o Render.
// Em desenvolvimento local: substitua pelo IP da sua máquina na rede Wi-Fi.
const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  'http://192.168.0.103:3000/api';

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
