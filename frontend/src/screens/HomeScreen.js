import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import GameCard from '../components/GameCard';
import { jogosService } from '../services/api';

const IMAGEM_POR_KEY = {
  semaforoIlustracao: require('../../assets/semaforoDoCorpoIlustracao.png'),
  toqueBomToqueRuimIlustracao: require('../../assets/toqueBomToqueRuimIlustracao.png'),
  poderDoNaoIlustracao: require('../../assets/poderDoNaoIlustracao.png'),
  adultosDeConfiancaIlustracao: require('../../assets/adultosDeConfiancaIlustracao.png'),
};
const IMAGEM_PLACEHOLDER = require('../../assets/icon.png');

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    jogosService
      .getCatalogoJogos()
      .then((res) => setJogos(res.data.jogos || []))
      .catch(() => setErro('Não foi possível carregar os jogos agora.'))
      .finally(() => setCarregando(false));
  }, []);

  const jogosComVisual = useMemo(
    () =>
      jogos.map((jogo) => ({
        ...jogo,
        cor: jogo.cor || COLORS.primary,
        imagem: IMAGEM_POR_KEY[jogo.imagemKey] || IMAGEM_PLACEHOLDER,
      })),
    [jogos]
  );

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
      {carregando ? <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} /> : null}
      {!carregando && erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}
      {!carregando && !erro && jogosComVisual.map((jogo) => (
        <GameCard
          key={jogo.id}
          titulo={jogo.titulo}
          descricao={jogo.descricao}
          imagem={jogo.imagem}
          cor={jogo.cor}
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
  loader: {
    marginTop: 16,
  },
  erroTexto: {
    color: COLORS.warmDark,
    fontSize: SIZES.md,
    marginTop: 8,
  },
});
