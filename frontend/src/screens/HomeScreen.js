import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let cancelado = false;
    setCarregando(true);
    setErro(null);
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
  }, [tentativa]);

  const jogosComVisual = useMemo(
    () =>
      jogos.map((jogo) => ({
        ...jogo,
        cor: jogo.cor || colors.primary,
        imagem: imagemCard[jogo.imagemKey] || imagemApp.logo,
      })),
    [jogos]
  );

  if (carregando) {
    return (
      <View style={appStyles.fullScreenCenter}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={appStyles.fullScreenCenter}>
        <Ionicons name="cloud-offline-outline" size={72} color={colors.textLightest} />
        <Text style={appStyles.erroTitulo}>{strings.home.erroTitulo}</Text>
        <Text style={appStyles.erroTexto}>{erro}</Text>
        <TouchableOpacity
          style={appStyles.erroBotao}
          onPress={() => setTentativa((t) => t + 1)}
          activeOpacity={0.8}
        >
          <Ionicons name="refresh-outline" size={20} color={colors.textWhite} />
          <Text style={appStyles.erroBotaoTexto}>{strings.home.erroBotaoTentar}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={appStyles.container} contentContainerStyle={appStyles.content}>
      <View style={appStyles.header}>
        <View>
          <Text style={appStyles.saudacao}>{strings.home.saudacao(user?.crianca?.nome || strings.home.nomePadrao)}</Text>
          <Text style={appStyles.subtitulo}>{strings.home.subtitulo}</Text>
        </View>
      </View>

      {jogosComVisual.map((jogo) => (
        <GameCard
          key={jogo.id}
          titulo={jogo.titulo}
          descricao={jogo.descricao}
          imagem={jogo.imagem}
          cor={jogo.cor}
          onPress={() => navigation.navigate(jogo.tela, { jogo })}
        />
      ))}
    </ScrollView>
  );
}
