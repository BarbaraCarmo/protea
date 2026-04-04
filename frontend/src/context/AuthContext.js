import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, progressoService } from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false);
    }
  }

  async function login(email, senha) {
    const response = await authService.login(email, senha);
    const userData = response.data;
    await AsyncStorage.setItem('token', userData.token);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }

  async function cadastrar(dados) {
    const response = await authService.cadastrar(dados);
    const userData = response.data;
    await AsyncStorage.setItem('token', userData.token);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }

  async function logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setUser(null);
  }

  async function atualizarProgresso(jogo, faseConcluida) {
    try {
      const medalhasAntes = user?.medalhas || [];
      const response = await progressoService.atualizarProgresso(jogo, faseConcluida);
      const novasMedalhas = (response.data.medalhas || []).filter(
        (m) => !medalhasAntes.includes(m)
      );
      const updatedUser = { ...user, progresso: response.data.progresso, medalhas: response.data.medalhas };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { ...response.data, novasMedalhas };
    } catch (error) {
      console.log('Erro ao atualizar progresso:', error);
      return { novasMedalhas: [] };
    }
  }

  async function atualizarAvatar(avatar) {
    try {
      const response = await progressoService.atualizarAvatar(avatar);
      const updatedUser = { ...user, crianca: response.data.crianca };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.log('Erro ao atualizar avatar:', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, cadastrar, logout, atualizarProgresso, atualizarAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
