import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { useAuth } from '../context/AuthContext';
import GameCard from '../components/GameCard';
import { jogosService } from '../services/api';
import { appStyles } from '../styles/App.styles';
import { imagemCard, imagemApp } from '../constants/imagemAssets';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let cancelado = false;
    jogosService
      .getCatalogoJogos()
      .then((res) => {
        const lista = res?.data?.jogos ?? res?.data;
        const listaOk = Array.isArray(lista) ? lista : [];
        if (!cancelado) setJogos(listaOk);
      })
      .catch((err) => {
        if (__DEV__) {
          console.warn(
            '[Home] catálogo de jogos:',
            err?.response?.status,
            err?.message || err
          );
        }
        if (!cancelado) setErro(strings.home.erroCarregarJogos);
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });
    return () => {
      cancelado = true;
    };
  }, []);

  const jogosComVisual = useMemo(
    () =>
      jogos.map((jogo) => ({
        ...jogo,
        cor: jogo.cor || colors.primary,
        imagem: imagemCard[jogo.imagemKey] || imagemApp.logo,
      })),
    [jogos]
  );

  return (
    <ScrollView style={appStyles.container} contentContainerStyle={appStyles.content}>
      {/* Header */}
      <View style={appStyles.header}>
        <View>
          <Text style={appStyles.saudacao}>{strings.home.saudacao(user?.crianca?.nome || strings.home.nomePadrao)}</Text>
          <Text style={appStyles.subtitulo}>{strings.home.subtitulo}</Text>
        </View>
      </View>

      {/* Cards dos jogos */}
      {carregando ? <ActivityIndicator size="large" color={colors.primary} style={appStyles.loader} /> : null}
      {!carregando && erro ? <Text style={appStyles.erroTexto}>{erro}</Text> : null}
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