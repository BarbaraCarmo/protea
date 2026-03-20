import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

const TOTAL_FASES = {
  semaforoDoCorpo: 10,
  toqueBomVsRuim: 11,
  poderDoNao: 12,
  adultoDeConfianca: 5,
};

const JOGOS = [
  { id: 'semaforoDoCorpo', titulo: 'Semáforo do Corpo', icone: 'ellipse', cor: COLORS.verde, medalha: 'Mestre do Semáforo' },
  { id: 'toqueBomVsRuim', titulo: 'Toque Bom vs Toque Ruim', icone: 'hand-left-outline', cor: COLORS.secondary, medalha: 'Guardião dos Toques' },
  { id: 'poderDoNao', titulo: 'O Poder do Não', icone: 'hand-right-outline', cor: COLORS.accent, medalha: 'Poder do Não' },
  { id: 'adultoDeConfianca', titulo: 'Adultos de Confiança', icone: 'people-outline', cor: COLORS.warm, medalha: 'Rede de Confiança' },
];

export default function ProgressoScreen() {
  const { user } = useAuth();
  const progresso = user?.progresso || {};
  const medalhas = user?.medalhas || [];

  function calcPorcentagem(jogoId) {
    const concluidos = progresso[jogoId]?.concluidos?.length || 0;
    return Math.round((concluidos / TOTAL_FASES[jogoId]) * 100);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Meu Progresso</Text>
      <Text style={styles.subtitulo}>Acompanhe sua evolução nos jogos!</Text>

      {JOGOS.map((jogo) => {
        const pct = calcPorcentagem(jogo.id);
        const concluidos = progresso[jogo.id]?.concluidos?.length || 0;
        const total = TOTAL_FASES[jogo.id];
        const temMedalha = medalhas.includes(jogo.medalha);

        return (
          <View key={jogo.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: jogo.cor + '20' }]}>
                <Ionicons name={jogo.icone} size={28} color={jogo.cor} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.jogoTitulo}>{jogo.titulo}</Text>
                <Text style={styles.jogoFases}>{concluidos} de {total} fases concluídas</Text>
              </View>
              {temMedalha && (
                <View style={[styles.medalhaContainer, { backgroundColor: jogo.cor + '20' }]}>
                  <Ionicons name="trophy" size={22} color={jogo.cor} />
                </View>
              )}
            </View>

            {/* Barra de progresso */}
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: jogo.cor }]} />
            </View>
            <Text style={[styles.progressText, { color: jogo.cor }]}>{pct}%</Text>

            {temMedalha && (
              <View style={[styles.medalhaTag, { backgroundColor: jogo.cor + '15' }]}>
                <Ionicons name="ribbon-outline" size={16} color={jogo.cor} />
                <Text style={[styles.medalhaTexto, { color: jogo.cor }]}>{jogo.medalha}</Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: SIZES.title, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  subtitulo: { fontSize: SIZES.md, color: COLORS.textLight, marginBottom: 24 },
  card: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.radius,
    padding: 18, marginBottom: 16,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  iconContainer: {
    width: 48, height: 48, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  cardInfo: { flex: 1 },
  jogoTitulo: { fontSize: SIZES.lg, fontWeight: 'bold', color: COLORS.text },
  jogoFases: { fontSize: SIZES.sm, color: COLORS.textLight, marginTop: 2 },
  medalhaContainer: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  progressBar: {
    height: 10, backgroundColor: COLORS.border, borderRadius: 5,
    overflow: 'hidden', marginBottom: 6,
  },
  progressFill: { height: '100%', borderRadius: 5 },
  progressText: { fontSize: SIZES.sm, fontWeight: 'bold', textAlign: 'right' },
  medalhaTag: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 10,
  },
  medalhaTexto: { fontSize: SIZES.sm, fontWeight: 'bold', marginLeft: 6 },
});
