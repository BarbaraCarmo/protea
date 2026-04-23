import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { strings } from '../../constants/strings';
import { imagemJogo } from '../../constants/imagemAssets';
import { audioSemaforo } from '../../constants/audioAssets';
import IntroJogo from '../../components/IntroJogo';
import { semaforoDoCorpoScreenStyles as styles } from '../../styles/jogos/JogosTemas.styles';
import { useAuth } from '../../context/AuthContext';
import CardImagem from '../../components/CardImagem';
import FeedbackModal from '../../components/FeedbackModal';
import MedalhaModal from '../../components/MedalhaModal';
import BotaoAudio from '../../components/BotaoAudio';
import { useAudio } from '../../hooks/useAudio';
import { jogosService } from '../../services/api';

const getMensagemErro = (fase, corEscolhida) => {
  if (corEscolhida === 'verde') return fase.feedbacks.outroParaVerde;
  return fase.feedbacks.verdeParaOutro;
};

const jogoId = 'semaforoDoCorpo';

export default function SemaforoDoCorpoScreen({ navigation, route }) {
  const jogoInfo = route.params?.jogo;
  const { atualizarProgresso, user } = useAuth();

  const [fases, setFases] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [faseAtual, setFaseAtual] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [concluido, setConcluido] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [medalhaConquistada, setMedalhaConquistada] = useState(null);
  const [modoRepeticao, setModoRepeticao] = useState(false);
  const [mostrarIntro, setMostrarIntro] = useState(false);
  const novasMedalhasRef   = useRef([]);
  const progressoPromiseRef = useRef(null);

  useEffect(() => {
    jogosService
      .getSemaforo()
      .then((res) => setFases(res.data.fases))
      .catch(() => setErro(strings.jogos.erroCarregar))
      .finally(() => setCarregando(false));
  }, []);

  // Retoma da primeira fase ainda não concluída; mostra intro se for a primeira vez
  useEffect(() => {
    if (fases.length === 0) return;
    const concluidos = user?.progresso?.[jogoId]?.concluidos || [];
    if (concluidos.length === 0) {
      setMostrarIntro(true);
      return;
    }
    const primeiraFasePendente = fases.findIndex(f => !concluidos.includes(f.id));
    if (primeiraFasePendente === -1) {
      setConcluido(true);
    } else {
      setFaseAtual(primeiraFasePendente);
    }
  }, [fases]); // eslint-disable-line react-hooks/exhaustive-deps

  const fase = fases[faseAtual];

  const { tocar, tocando } = useAudio(fase ? audioSemaforo[fase.id] : null);

  const animarCard = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
  }, [scaleAnim]);

  const handleResposta = useCallback(
    (corEscolhida) => {
      if (!fase) return;
      animarCard();
      novasMedalhasRef.current = [];
      const correto = corEscolhida === fase.respostaCorreta;
      if (correto) {
        setAcertou(true);
        setMensagem(fase.feedbacks.correto);
        if (!modoRepeticao) {
          progressoPromiseRef.current = atualizarProgresso(jogoId, fase.id).then((resultado) => {
            novasMedalhasRef.current = resultado?.novasMedalhas || [];
          });
        }
      } else {
        setAcertou(false);
        setMensagem(getMensagemErro(fase, corEscolhida));
      }
      setModalVisible(true);
    },
    [fase, animarCard, atualizarProgresso, modoRepeticao]
  );

  const avancar = useCallback(() => {
    if (faseAtual < fases.length - 1) {
      setFaseAtual((prev) => prev + 1);
    } else {
      setConcluido(true);
    }
  }, [faseAtual, fases.length]);

  const handleFecharModal = useCallback(async () => {
    setModalVisible(false);
    if (acertou) {
      if (progressoPromiseRef.current) {
        await progressoPromiseRef.current;
        progressoPromiseRef.current = null;
      }
      const prata = novasMedalhasRef.current.includes(`${jogoId}_prata`);
      const ouro = novasMedalhasRef.current.includes(`${jogoId}_ouro`);
      const isUltimaFase = faseAtual >= fases.length - 1;
      if ((prata || ouro) && !isUltimaFase && !modoRepeticao) {
        novasMedalhasRef.current = [];
        setMedalhaConquistada(prata ? 'prata' : 'ouro');
        return;
      }
      novasMedalhasRef.current = [];
      avancar();
    }
  }, [acertou, avancar, faseAtual, fases.length, modoRepeticao]);

  const reiniciarJogo = useCallback(() => {
    setFaseAtual(0);
    setConcluido(false);
    setModoRepeticao(true);
    setModalVisible(false);
    setMedalhaConquistada(null);
  }, []);

  const handleFecharMedalhaModal = useCallback(() => {
    setMedalhaConquistada(null);
    avancar();
  }, [avancar]);

  if (carregando) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (erro) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.concluidoContainer}>
          <Ionicons name="cloud-offline-outline" size={64} color={colors.textLight} />
          <Text style={styles.concluidoTexto}>{erro}</Text>
          <TouchableOpacity style={[styles.botaoConclusao, styles.botaoPrimario]} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={colors.textWhite} />
            <Text style={styles.botaoConclusaoTexto}>{strings.jogos.botaoVoltar}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (mostrarIntro) {
    return <IntroJogo jogoInfo={jogoInfo} onComecar={() => setMostrarIntro(false)} />;
  }

  if (concluido) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.concluidoContainer}>
          <View style={styles.concluidoIcone}>
            <Ionicons name="trophy-outline" size={80} color={colors.accent} />
          </View>
          <Text style={styles.concluidoTitulo}>{strings.jogos.conclusaoTitulo}</Text>
          <Text style={styles.concluidoTexto}>{strings.jogos.semaforo.conclusaoMensagem}</Text>
          <TouchableOpacity
            style={[styles.botaoConclusao, styles.botaoRepetir]}
            onPress={reiniciarJogo}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh-outline" size={22} color={colors.textWhite} />
            <Text style={styles.botaoConclusaoTexto}>{strings.jogos.botaoJogarNovamente}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botaoConclusao, styles.botaoPrimario]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="home-outline" size={22} color={colors.textWhite} />
            <Text style={styles.botaoConclusaoTexto}>{strings.jogos.botaoVoltarInicio}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progresso = (faseAtual / fases.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressoContainerJogos}>
        <View style={styles.progressoBarra}>
          <View style={[styles.progressoPreenchido, { width: `${progresso}%` }]} />
        </View>
        <Text style={styles.progressoTexto}>
          {strings.jogos.progressoLabel(faseAtual + 1, fases.length)}
        </Text>
      </View>

      <View style={styles.botaoAudioContainer}>
        <BotaoAudio onPress={tocar} tocando={tocando} />
      </View>

      <View style={styles.cardArea}>
        <Text style={styles.situacaoDescricao}>{strings.jogos.semaforo.instrucao}</Text>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.cardImagemArea}>
            <CardImagem source={imagemJogo.semaforoDoCorpo} width="100%" height="100%" />
          </View>
          <Text style={styles.cardLabel}>{fase.parteDoCorpo}</Text>
        </Animated.View>
      </View>

      <View style={styles.legendaContainer}>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaBola, { backgroundColor: colors.verde }]} />
          <Text style={styles.legendaTexto}>{strings.jogos.semaforo.legendaVerde}</Text>
        </View>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaBola, { backgroundColor: colors.amarelo }]} />
          <Text style={styles.legendaTexto}>{strings.jogos.semaforo.legendaAmarelo}</Text>
        </View>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaBola, { backgroundColor: colors.vermelho }]} />
          <Text style={styles.legendaTexto}>{strings.jogos.semaforo.legendaVermelho}</Text>
        </View>
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botaoCor, { backgroundColor: colors.verde }]}
          onPress={() => handleResposta('verde')}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle-outline" size={28} color="#FFFFFF" />
          <Text style={styles.botaoCorTexto}>{strings.jogos.semaforo.botaoVerde}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoCor, { backgroundColor: colors.amarelo }]}
          onPress={() => handleResposta('amarelo')}
          activeOpacity={0.8}
        >
          <Ionicons name="warning-outline" size={28} color="#FFFFFF" />
          <Text style={styles.botaoCorTexto}>{strings.jogos.semaforo.botaoAmarelo}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoCor, { backgroundColor: colors.vermelho }]}
          onPress={() => handleResposta('vermelho')}
          activeOpacity={0.8}
        >
          <Ionicons name="close-circle-outline" size={28} color="#FFFFFF" />
          <Text style={styles.botaoCorTexto}>{strings.jogos.semaforo.botaoVermelho}</Text>
        </TouchableOpacity>
      </View>

      <FeedbackModal
        visible={modalVisible}
        acertou={acertou}
        mensagem={mensagem}
        onClose={handleFecharModal}
      />
      <MedalhaModal
        visible={medalhaConquistada !== null}
        tipo={medalhaConquistada}
        jogoTitulo={strings.nav.jogos.semaforoDoCorpo}
        onClose={handleFecharMedalhaModal}
      />
    </SafeAreaView>
  );
}
