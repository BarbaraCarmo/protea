import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { appStyles } from '../styles/App.styles';

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
    <ScrollView style={appStyles.container} contentContainerStyle={appStyles.content}>
      <Text style={appStyles.progressoSubtitulo}>Responda as perguntas para conquistar as medalhas!</Text>
      {JOGOS.map((jogo) => {
        const pct = calcPorcentagem(jogo.id);
        const concluidos = progresso[jogo.id]?.concluidos?.length || 0;
        const total = TOTAL_FASES[jogo.id];
        const temMedalha = medalhas.includes(jogo.medalha);

        return (
          <View key={jogo.id} style={appStyles.card}>
            <View style={appStyles.progressoCardHeader}>
              <View style={[appStyles.progressoIconContainer, { backgroundColor: jogo.cor + '20' }]}>
                <Ionicons name={jogo.icone} size={28} color={jogo.cor} />
              </View>
              <View style={appStyles.progressoCardInfo}>
                <Text style={appStyles.progressoJogoTitulo}>{jogo.titulo}</Text>
                <Text style={appStyles.progressoJogoFases}>{concluidos} de {total} fases concluídas</Text>
              </View>
            </View>

            <View style={appStyles.progressoBarra}>
              <View style={[appStyles.progressoPreenchido, { width: `${pct}%`, backgroundColor: jogo.cor }]} />
            </View>
            <Text style={[appStyles.progressoTexto, { color: jogo.cor }]}>{pct}%</Text>

            {temMedalha && (
              <View style={[appStyles.progressoMedalhaTag, { backgroundColor: jogo.cor + '15' }]}>
                <Ionicons name="ribbon-outline" size={16} color={jogo.cor} />
                <Text style={[appStyles.progressoMedalhaTexto, { color: jogo.cor }]}>{jogo.medalha}</Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}
