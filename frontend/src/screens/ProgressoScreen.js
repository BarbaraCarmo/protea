import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { appStyles } from '../styles/App.styles';
import { JOGOS_CONFIG, COR_PRATA, COR_OURO, normalizarMedalhas } from '../constants/jogos';

export default function ProgressoScreen() {
  const { user } = useAuth();
  const progresso = user?.progresso || {};
  const medalhas  = normalizarMedalhas(user?.medalhas);

  function calcPorcentagem(jogo) {
    const concluidos = progresso[jogo.id]?.concluidos?.length || 0;
    return Math.round((concluidos / jogo.totalFases) * 100);
  }

  return (
    <ScrollView style={appStyles.container} contentContainerStyle={appStyles.content}>
      {JOGOS_CONFIG.map((jogo) => {
        const pct        = calcPorcentagem(jogo);
        const concluidos = progresso[jogo.id]?.concluidos?.length || 0;
        const temPrata   = medalhas.includes(jogo.medalha_prata);
        const temOuro    = medalhas.includes(jogo.medalha_ouro);

        return (
          <View key={jogo.id} style={appStyles.card}>
            <View style={appStyles.progressoCardHeader}>
              <View style={[appStyles.progressoIconContainer, { backgroundColor: jogo.cor + '20' }]}>
                <Ionicons name={jogo.icone} size={28} color={jogo.cor} />
              </View>
              <View style={appStyles.progressoCardInfo}>
                <Text style={appStyles.progressoJogoTitulo}>{jogo.titulo}</Text>
                <Text style={appStyles.progressoJogoFases}>{concluidos} de {jogo.totalFases} fases concluídas</Text>
              </View>
            </View>

            <View style={appStyles.progressoBarra}>
              <View style={[appStyles.progressoPreenchido, { width: `${pct}%`, backgroundColor: jogo.cor }]} />
              {/* Marcador de 50% */}
              <View style={appStyles.progressoMarcador50} />
            </View>
            <Text style={[appStyles.progressoTexto, { color: jogo.cor }]}>{pct}%</Text>

            <View style={appStyles.progressoMedalhasRow}>
              {[
                { conquistada: temPrata, cor: COR_PRATA, icone: 'medal-outline', label: 'Prata — 50%' },
                { conquistada: temOuro,  cor: COR_OURO,  icone: 'trophy',        label: 'Ouro — 100%' },
              ].map(({ conquistada, cor, icone, label }) => (
                <View
                  key={label}
                  style={[
                    appStyles.progressoMedalhaBadge,
                    { backgroundColor: conquistada ? cor + '18' : COLORS.border + '50' },
                  ]}
                >
                  <Ionicons
                    name={conquistada ? icone : 'lock-closed-outline'}
                    size={14}
                    color={conquistada ? cor : COLORS.textLightest}
                  />
                  <Text style={[appStyles.progressoMedalhaTexto, { color: conquistada ? cor : COLORS.textLightest }]}>
                    {label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
