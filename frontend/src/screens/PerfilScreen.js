import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar e info */}
      <View style={styles.profileCard}>
        <View style={[styles.avatarGrande, { backgroundColor: avatarAtual.cor + '20' }]}>
          <Ionicons name={avatarAtual.icone} size={60} color={avatarAtual.cor} />
        </View>
        <Text style={styles.nome}>{user?.crianca?.nome || 'Amiguinho'}</Text>
        <Text style={styles.idade}>{calcularIdade()}</Text>
      </View>

      {/* Escolher Avatar */}
      <Text style={styles.secaoTitulo}>Escolha seu avatar</Text>
      <View style={styles.avatarGrid}>
        {AVATARES.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              styles.avatarItem,
              avatarSelecionado === avatar.id && { borderColor: avatar.cor, borderWidth: 3 },
            ]}
            onPress={() => selecionarAvatar(avatar.id)}
          >
            <Ionicons name={avatar.icone} size={36} color={avatar.cor} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Medalhas */}
      <Text style={styles.secaoTitulo}>Medalhas conquistadas</Text>
      <View style={styles.medalhasContainer}>
        {Object.entries(MEDALHAS_INFO).map(([nome, info]) => {
          const conquistada = medalhas.includes(nome);
          return (
            <View
              key={nome}
              style={[styles.medalhaItem, !conquistada && styles.medalhaInativa]}
            >
              <View style={[styles.medalhaIcone, { backgroundColor: conquistada ? info.cor + '20' : COLORS.border }]}>
                <Ionicons
                  name={conquistada ? 'trophy' : 'lock-closed-outline'}
                  size={28}
                  color={conquistada ? info.cor : COLORS.textLight}
                />
              </View>
              <Text style={[styles.medalhaNome, !conquistada && { color: COLORS.textLight }]}>
                {nome}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Botão Sair */}
      <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
        <Text style={styles.botaoSairTexto}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  profileCard: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.radiusLg,
    padding: 24, alignItems: 'center', marginBottom: 24,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3,
  },
  avatarGrande: {
    width: 100, height: 100, borderRadius: 50,
    justifyContent: 'center', alignItems: 'center', marginBottom: 14,
  },
  nome: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text },
  idade: { fontSize: SIZES.lg, color: COLORS.textLight, marginTop: 4 },
  secaoTitulo: {
    fontSize: SIZES.xl, fontWeight: 'bold', color: COLORS.text, marginBottom: 14,
  },
  avatarGrid: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',
    marginBottom: 24,
  },
  avatarItem: {
    width: '30%', aspectRatio: 1, backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius, justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, borderWidth: 2, borderColor: COLORS.border,
  },
  medalhasContainer: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',
    marginBottom: 24,
  },
  medalhaItem: {
    width: '48%', backgroundColor: COLORS.surface, borderRadius: SIZES.radius,
    padding: 16, alignItems: 'center', marginBottom: 12,
  },
  medalhaInativa: { opacity: 0.5 },
  medalhaIcone: {
    width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  medalhaNome: { fontSize: SIZES.sm, fontWeight: 'bold', color: COLORS.text, textAlign: 'center' },
  botaoSair: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.surface, borderRadius: SIZES.radius,
    paddingVertical: 16, borderWidth: 1, borderColor: COLORS.error,
  },
  botaoSairTexto: { color: COLORS.error, fontSize: SIZES.lg, fontWeight: 'bold', marginLeft: 8 },
});
