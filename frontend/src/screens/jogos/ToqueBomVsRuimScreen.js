import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { strings } from '../../constants/strings';
import { imagemPorChave, imagemMedalha } from '../../constants/imagemAssets';
import IntroJogo from '../../components/IntroJogo';
import { audioToque } from '../../constants/audioAssets';
import { toqueBomVsRuimScreenStyles as styles } from '../../styles/jogos/JogosTemas.styles';
import { useAuth } from '../../context/AuthContext';
import CardImagem from '../../components/CardImagem';
import FeedbackModal from '../../components/FeedbackModal';
import MedalhaModal from '../../components/MedalhaModal';
import BotaoAudio from '../../components/BotaoAudio';
import { useAudio } from '../../hooks/useAudio';
import { jogosService } from '../../services/api';

const jogoId = 'toqueBomVsRuim';

export default function ToqueBomVsRuimScreen({ navigation, route }) {
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
  const [medalhaConquistada, setMedalhaConquistada] = useState(null);
  const [modoRepeticao, setModoRepeticao] = useState(false);
  const [mostrarIntro, setMostrarIntro] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const novasMedalhasRef   = useRef([]);
  const progressoPromiseRef = useRef(null);

  useEffect(() => {
    jogosService
      .getToque()
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

  const { tocar, tocando } = useAudio(fase ? audioToque[fase.id] : null);

  const animarEntrada = useCallback(() => {
    slideAnim.setValue(50);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, [slideAnim]);

  const handleResposta = useCallback(
    (tipoEscolhido) => {
      if (!fase) return;
      novasMedalhasRef.current = [];
      const correto = tipoEscolhido === fase.respostaCorreta;
      if (correto) {
        setAcertou(true);
        setMensagem(fase.feedbackCorreto);
        if (!modoRepeticao) {
          progressoPromiseRef.current = atualizarProgresso(jogoId, fase.id).then((resultado) => {
            novasMedalhasRef.current = resultado?.novasMedalhas || [];
          });
        }
      } else {
        setAcertou(false);
        setMensagem(fase.feedbackIncorreto);
      }
      setModalVisible(true);
    },
    [fase, atualizarProgresso, modoRepeticao]
  );

  const avancar = useCallback(() => {
    if (faseAtual < fases.length - 1) {
      setFaseAtual((prev) => prev + 1);
      animarEntrada();
    } else {
      setConcluido(true);
    }
  }, [faseAtual, fases.length, animarEntrada]);

  const reiniciarJogo = useCallback(() => {
    setFaseAtual(0);
    setConcluido(false);
    setModoRepeticao(true);
    setModalVisible(false);
    setMedalhaConquistada(null);
  }, []);

  const handleFecharModal = useCallback(async () => {
    setModalVisible(false);
    if (acertou) {
      if (progressoPromiseRef.current) {
        await progressoPromiseRef.current;
        progressoPromiseRef.current = null;
      }
      const prata = novasMedalhasRef.current.includes(`${jogoId}_prata`);
      const ouro  = novasMedalhasRef.current.includes(`${jogoId}_ouro`);
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
          <Image
            source={imagemMedalha[jogoId]?.ouro}
            style={styles.concluidoMedalhaImagem}
            resizeMode="contain"
          />
          <Text style={styles.concluidoTitulo}>{strings.jogos.conclusaoTitulo}</Text>
          <Text style={styles.concluidoTexto}>{strings.jogos.toque.conclusaoMensagem}</Text>
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
        <Animated.View style={[styles.card, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.cardImagemArea}>
            <CardImagem
              source={imagemPorChave[fase.ilustracao]}
              width="100%"
              height="100%"
            />
          </View>
        </Animated.View>

        <Text style={styles.situacaoDescricao}>{fase.texto}</Text>
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botaoResposta, styles.botaoBom]}
          onPress={() => handleResposta('bom')}
          activeOpacity={0.8}
        >
          <Ionicons name="thumbs-up-outline" size={36} color={colors.textWhite} />
          <Text style={styles.botaoRespostaTexto}>{strings.jogos.toque.botaoToqueBom}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoResposta, styles.botaoRuim]}
          onPress={() => handleResposta('ruim')}
          activeOpacity={0.8}
        >
          <Ionicons name="thumbs-down-outline" size={36} color={colors.textWhite} />
          <Text style={styles.botaoRespostaTexto}>{strings.jogos.toque.botaoToqueRuim}</Text>
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
        jogoId={jogoId}
        jogoTitulo={strings.nav.jogos.toqueBomVsRuim}
        onClose={handleFecharMedalhaModal}
      />
    </SafeAreaView>
  );
}
