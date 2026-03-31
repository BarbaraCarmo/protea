import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { appStyles } from '../styles/App.styles';

const AVATARES = [
  { id: 'avatar1', icone: 'happy-outline', cor: COLORS.primary },
  { id: 'avatar2', icone: 'heart-outline', cor: COLORS.warm },
  { id: 'avatar3', icone: 'star-outline', cor: COLORS.accent },
  { id: 'avatar4', icone: 'flower-outline', cor: COLORS.secondary },
  { id: 'avatar5', icone: 'planet-outline', cor: '#B39DDB' },
  { id: 'avatar6', icone: 'paw-outline', cor: '#A1887F' },
];

const MEDALHAS_INFO = {
  'Mestre do Semáforo': { icone: 'ellipse', cor: COLORS.verde },
  'Guardião dos Toques': { icone: 'hand-left-outline', cor: COLORS.secondary },
  'Poder do Não': { icone: 'hand-right-outline', cor: COLORS.accent },
  'Rede de Confiança': { icone: 'people-outline', cor: COLORS.warm },
};

export default function PerfilScreen() {
  const { user, atualizarAvatar, logout } = useAuth();
  const [avatarSelecionado, setAvatarSelecionado] = useState(user?.crianca?.avatar || 'avatar1');
  const medalhas = user?.medalhas || [];

  function calcularIdade() {
    if (!user?.crianca?.dataNascimento) return '';
    const nasc = new Date(user.crianca.dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return `${idade} anos`;
  }

  async function selecionarAvatar(avatarId) {
    setAvatarSelecionado(avatarId);
    try {
      await atualizarAvatar(avatarId);
    } catch (e) {
      console.log('Erro ao salvar avatar');
    }
  }

  function handleLogout() {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  }

  const avatarAtual = AVATARES.find((a) => a.id === avatarSelecionado) || AVATARES[0];

  return (
    <ScrollView style={appStyles.container} contentContainerStyle={appStyles.content}>
      {/* Avatar e info */}
      <View style={appStyles.perfilCard}>
        <View style={[appStyles.avatarGrande, { backgroundColor: avatarAtual.cor + '20' }]}>
          <Ionicons name={avatarAtual.icone} size={60} color={avatarAtual.cor} />
        </View>
        <Text style={appStyles.nome}>{user?.crianca?.nome || 'Amiguinho'}</Text>
        <Text style={appStyles.idade}>{calcularIdade()}</Text>
      </View>

      {/* Escolher Avatar */}
      <Text style={appStyles.secaoTitulo}>Escolha seu avatar</Text>
      <View style={appStyles.avatarGrid}>
        {AVATARES.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              appStyles.avatarItem,
              avatarSelecionado === avatar.id && { borderColor: avatar.cor, borderWidth: 3 },
            ]}
            onPress={() => selecionarAvatar(avatar.id)}
          >
            <Ionicons name={avatar.icone} size={36} color={avatar.cor} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Medalhas */}
      <Text style={appStyles.secaoTitulo}>Medalhas conquistadas</Text>
      <View style={appStyles.medalhasContainer}>
        {Object.entries(MEDALHAS_INFO).map(([nome, info]) => {
          const conquistada = medalhas.includes(nome);
          return (
            <View
              key={nome}
              style={[appStyles.medalhaItem, !conquistada && appStyles.medalhaInativa]}
            >
              <View style={[appStyles.medalhaIcone, { backgroundColor: conquistada ? info.cor + '20' : COLORS.border }]}>
                <Ionicons
                  name={conquistada ? 'trophy' : 'lock-closed-outline'}
                  size={28}
                  color={conquistada ? info.cor : COLORS.textLight}
                />
              </View>
              <Text style={[appStyles.medalhaNome, !conquistada && { color: COLORS.textLight }]}>
                {nome}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Botão Sair */}
      <TouchableOpacity style={appStyles.botaoSair} onPress={handleLogout}>
        <Text style={appStyles.botaoSairTexto}>SAIR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}