import React, { useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { appStyles } from '../styles/App.styles';
import { jogosUI, corPrata, corOuro, normalizarMedalhas } from '../constants/jogos';
import { strings } from '../constants/strings';

export default function ProgressoScreen() {
  const { user, catalogo, recarregarProgresso } = useAuth();

  useFocusEffect(
    useCallback(() => {
      recarregarProgresso();
    }, [])
  );
  const progresso = user?.progresso || {};
  const medalhas  = normalizarMedalhas(user?.medalhas, catalogo);

  function calcPorcentagem(jogo) {
    if (!jogo.totalFases) return 0;
    const concluidos = progresso[jogo.id]?.concluidos?.length || 0;
    return Math.round((concluidos / jogo.totalFases) * 100);
  }

  return (
    <ScrollView style={appStyles.container} contentContainerStyle={appStyles.content}>
      {catalogo.map((jogo) => {
        const ui         = jogosUI[jogo.id] || {};
        const pct        = calcPorcentagem(jogo);
        const concluidos = progresso[jogo.id]?.concluidos?.length || 0;
        const temPrata   = medalhas.includes(jogo.medalhaPrata);
        const temOuro    = medalhas.includes(jogo.medalhaOuro);

        return (
          <View key={jogo.id} style={appStyles.card}>
            <View style={appStyles.progressoCardHeader}>
              <View style={[appStyles.progressoIconContainer, { backgroundColor: jogo.cor + '20' }]}>
                <Ionicons name={ui.icone} size={28} color={jogo.cor} />
              </View>
              <View style={appStyles.progressoCardInfo}>
                <Text style={appStyles.progressoJogoTitulo}>{jogo.titulo}</Text>
                <Text style={appStyles.progressoJogoFases}>{strings.progresso.fasesConcluidas(concluidos, jogo.totalFases)}</Text>
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
                { conquistada: temPrata, cor: corPrata, icone: 'medal-outline', label: strings.progresso.medalhaPrata },
                { conquistada: temOuro,  cor: corOuro,  icone: 'trophy',        label: strings.progresso.medalhaOuro },
              ].map(({ conquistada, cor, icone, label }) => (
                <View
                  key={label}
                  style={[
                    appStyles.progressoMedalhaBadge,
                    { backgroundColor: conquistada ? cor + '18' : colors.border + '50' },
                  ]}
                >
                  <Ionicons
                    name={conquistada ? icone : 'lock-closed-outline'}
                    size={14}
                    color={conquistada ? cor : colors.textLightest}
                  />
                  <Text style={[appStyles.progressoMedalhaTexto, { color: conquistada ? cor : colors.textLightest }]}>
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
