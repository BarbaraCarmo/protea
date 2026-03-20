import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import GameCard from '../components/GameCard';

const TOTAL_FASES = {
  semaforoDoCorpo: 10,
  toqueBomVsRuim: 11,
  poderDoNao: 12,
  adultoDeConfianca: 5,
};

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const progresso = user?.progresso || {};

  function calcPorcentagem(jogo) {
    const concluidos = progresso[jogo]?.concluidos?.length || 0;
    return Math.round((concluidos / TOTAL_FASES[jogo]) * 100);
  }

  const jogos = [
    {
      id: 'semaforoDoCorpo',
      titulo: 'Semáforo do Corpo',
      descricao: 'Classifique as partes do corpo como um semáforo!',
      icone: 'ellipse',
      cor: COLORS.verde,
      tela: 'SemaforoDoCorpo',
    },
    {
      id: 'toqueBomVsRuim',
      titulo: 'Toque Bom vs Toque Ruim',
      descricao: 'Aprenda a diferença entre toques seguros e perigosos!',
      icone: 'hand-left-outline',
      cor: COLORS.secondary,
      tela: 'ToqueBomVsRuim',
    },
    {
      id: 'poderDoNao',
      titulo: 'O Poder do Não',
      descricao: 'Aprenda a dizer NÃO de forma firme e segura!',
      icone: 'hand-right-outline',
      cor: COLORS.accent,
      tela: 'PoderDoNao',
    },
    {
      id: 'adultoDeConfianca',
      titulo: 'Adultos de Confiança',
      descricao: 'Identifique os adultos em quem você pode confiar!',
      icone: 'people-outline',
      cor: COLORS.warm,
      tela: 'AdultosDeConfianca',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.saudacao}>Olá, {user?.crianca?.nome || 'Amiguinho'}!</Text>
          <Text style={styles.subtitulo}>Vamos aprender brincando?</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Ionicons name="happy-outline" size={36} color={COLORS.primary} />
        </View>
      </View>

      {/* Cards dos jogos */}
      <Text style={styles.secaoTitulo}>Jogos</Text>
      {jogos.map((jogo) => (
        <GameCard
          key={jogo.id}
          titulo={jogo.titulo}
          descricao={jogo.descricao}
          icone={jogo.icone}
          cor={jogo.cor}
          progresso={calcPorcentagem(jogo.id)}
          onPress={() => navigation.navigate(jogo.tela)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 30 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 24, marginTop: 10,
  },
  saudacao: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text },
  subtitulo: { fontSize: SIZES.md, color: COLORS.textLight, marginTop: 4 },
  avatarContainer: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center', alignItems: 'center',
  },
  secaoTitulo: {
    fontSize: SIZES.xl, fontWeight: 'bold', color: COLORS.text, marginBottom: 14,
  },
});
