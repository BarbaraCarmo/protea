import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { imagemPorChave } from '../../constants/imagemAssets';
import { toqueBomVsRuimScreenStyles as styles } from '../../styles/jogos/JogosTemas.styles';
import { useAuth } from '../../context/AuthContext';
import CardImagem from '../../components/CardImagem';
import FeedbackModal from '../../components/FeedbackModal';
import MedalhaModal from '../../components/MedalhaModal';
import { jogosService } from '../../services/api';

export default function ToqueBomVsRuimScreen({ navigation }) {
  const { atualizarProgresso } = useAuth();

  const [fases, setFases] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [faseAtual, setFaseAtual] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [concluido, setConcluido] = useState(false);
  const [medalhaConquistada, setMedalhaConquistada] = useState(null);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const novasMedalhasRef = useRef([]);

  useEffect(() => {
    jogosService
      .getToque()
      .then((res) => setFases(res.data.fases))
      .catch(() => setErro('Não foi possível carregar o jogo. Tente novamente.'))
      .finally(() => setCarregando(false));
  }, []);

  const fase = fases[faseAtual];

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
        atualizarProgresso('toqueBomVsRuim', fase.id).then((resultado) => {
          novasMedalhasRef.current = resultado?.novasMedalhas || [];
        });
      } else {
        setAcertou(false);
        setMensagem(fase.feedbackIncorreto);
      }
      setModalVisible(true);
    },
    [fase, atualizarProgresso]
  );

  const avancar = useCallback(() => {
    if (faseAtual < fases.length - 1) {
      setFaseAtual((prev) => prev + 1);
      animarEntrada();
    } else {
      setConcluido(true);
    }
  }, [faseAtual, fases.length, animarEntrada]);

  const handleFecharModal = useCallback(() => {
    setModalVisible(false);
    if (acertou) {
      const prata = novasMedalhasRef.current.includes('toqueBomVsRuim_prata');
      const ouro  = novasMedalhasRef.current.includes('toqueBomVsRuim_ouro');
      if (prata || ouro) {
        novasMedalhasRef.current = [];
        setMedalhaConquistada(prata ? 'prata' : 'ouro');
        return;
      }
      avancar();
    }
  }, [acertou, avancar]);

  const handleFecharMedalhaModal = useCallback(() => {
    setMedalhaConquistada(null);
    avancar();
  }, [avancar]);

  if (carregando) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (erro) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.concluidoContainer}>
          <Ionicons name="cloud-offline-outline" size={64} color={COLORS.textLight} />
          <Text style={styles.concluidoTexto}>{erro}</Text>
          <TouchableOpacity style={styles.botaoAcao} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.textWhite} />
            <Text style={styles.botaoAcaoTexto}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (concluido) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.concluidoContainer}>
          <View style={styles.concluidoIcone}>
            <Ionicons name="shield-checkmark-outline" size={80} color={COLORS.primary} />
          </View>
          <Text style={styles.concluidoTitulo}>Parabéns!</Text>
          <Text style={styles.concluidoTexto}>
            Você completou o jogo Toque Bom vs Toque Ruim! Agora você sabe
            identificar toques seguros e perigosos. Lembre-se: seu corpo é seu!
          </Text>
          <TouchableOpacity
            style={styles.botaoVoltarInicio}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="home-outline" size={22} color={COLORS.textWhite} />
            <Text style={styles.botaoVoltarTexto}>Voltar ao início</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progresso = (faseAtual / fases.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de progresso */}
      <View style={styles.progressoContainerJogos}>
        <View style={styles.progressoBarra}>
          <View style={[styles.progressoPreenchido, { width: `${progresso}%` }]} />
        </View>
        <Text style={styles.progressoTexto}>
          {faseAtual + 1} de {fases.length}
        </Text>
      </View>

      {/* Área central: card + situação abaixo */}
      <View style={styles.cardArea}>
        {/* Card com imagem ilustrativa */}
        <Animated.View style={[styles.card, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.cardImagemArea}>
            <CardImagem
              source={imagemPorChave[fase.ilustracao]}
              width={150}
              height={150}
              cor={fase.respostaCorreta === 'bom' ? COLORS.toqueBom : COLORS.toqueRuim}
            />
          </View>
        </Animated.View>

        {/* Situação — abaixo do card */}
        <Text style={styles.situacaoDescricao}>{fase.texto}</Text>
      </View>

      {/* Botões Bom / Ruim */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botaoResposta, styles.botaoBom]}
          onPress={() => handleResposta('bom')}
          activeOpacity={0.8}
        >
          <Ionicons name="thumbs-up-outline" size={36} color={COLORS.textWhite} />
          <Text style={styles.botaoRespostaTexto}>Toque Bom</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoResposta, styles.botaoRuim]}
          onPress={() => handleResposta('ruim')}
          activeOpacity={0.8}
        >
          <Ionicons name="thumbs-down-outline" size={36} color={COLORS.textWhite} />
          <Text style={styles.botaoRespostaTexto}>Toque Ruim</Text>
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
        jogoTitulo="Toque Bom vs Toque Ruim"
        onClose={handleFecharMedalhaModal}
      />
    </SafeAreaView>
  );
}
