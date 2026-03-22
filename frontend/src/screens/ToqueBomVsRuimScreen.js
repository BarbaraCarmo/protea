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
import { COLORS } from '../constants/colors';
import { toqueBomVsRuimScreenStyles } from '../styles/ToqueBomVsRuimScreen.styles';
import { useAuth } from '../context/AuthContext';
import FeedbackModal from '../components/FeedbackModal';
import { jogosService } from '../services/api';

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
  const slideAnim = useRef(new Animated.Value(0)).current;

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

      const correto = tipoEscolhido === fase.respostaCorreta;

      if (correto) {
        setAcertou(true);
        setMensagem(fase.feedbackCorreto);
        atualizarProgresso('toqueBomVsRuim', fase.id);
      } else {
        setAcertou(false);
        setMensagem(fase.feedbackIncorreto);
      }
      setModalVisible(true);
    },
    [fase, atualizarProgresso]
  );

  const handleFecharModal = useCallback(() => {
    setModalVisible(false);
    if (acertou) {
      if (faseAtual < fases.length - 1) {
        setFaseAtual((prev) => prev + 1);
        animarEntrada();
      } else {
        setConcluido(true);
      }
    }
  }, [acertou, faseAtual, fases.length, animarEntrada]);

  if (carregando) {
    return (
      <SafeAreaView style={toqueBomVsRuimScreenStyles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (erro) {
    return (
      <SafeAreaView style={toqueBomVsRuimScreenStyles.container}>
        <View style={toqueBomVsRuimScreenStyles.concluidoContainer}>
          <Ionicons name="cloud-offline-outline" size={64} color={COLORS.textLight} />
          <Text style={toqueBomVsRuimScreenStyles.concluidoTexto}>{erro}</Text>
          <TouchableOpacity style={toqueBomVsRuimScreenStyles.botaoAcao} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.textWhite} />
            <Text style={toqueBomVsRuimScreenStyles.botaoAcaoTexto}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (concluido) {
    return (
      <SafeAreaView style={toqueBomVsRuimScreenStyles.container}>
        <View style={toqueBomVsRuimScreenStyles.concluidoContainer}>
          <View style={toqueBomVsRuimScreenStyles.concluidoIcone}>
            <Ionicons name="shield-checkmark-outline" size={80} color={COLORS.primary} />
          </View>
          <Text style={toqueBomVsRuimScreenStyles.concluidoTitulo}>Parabéns!</Text>
          <Text style={toqueBomVsRuimScreenStyles.concluidoTexto}>
            Você completou o jogo Toque Bom vs Toque Ruim! Agora você sabe
            identificar toques seguros e perigosos. Lembre-se: seu corpo é seu!
          </Text>
          <TouchableOpacity
            style={toqueBomVsRuimScreenStyles.botaoVoltarInicio}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="home-outline" size={22} color={COLORS.textWhite} />
            <Text style={toqueBomVsRuimScreenStyles.botaoVoltarTexto}>Voltar ao início</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progresso = (faseAtual / fases.length) * 100;

  return (
    <SafeAreaView style={toqueBomVsRuimScreenStyles.container}>
      {/* Progress Bar */}
      <View style={toqueBomVsRuimScreenStyles.progressoContainer}>
        <View style={toqueBomVsRuimScreenStyles.progressoBarra}>
          <View style={[toqueBomVsRuimScreenStyles.progressoPreenchido, { width: `${progresso}%` }]} />
        </View>
        <Text style={toqueBomVsRuimScreenStyles.progressoTexto}>
          {faseAtual + 1} de {fases.length}
        </Text>
      </View>

      {/* Instruction */}
      <View style={toqueBomVsRuimScreenStyles.instrucaoContainer}>
        <Ionicons name="bulb-outline" size={20} color={COLORS.accent} />
        <Text style={toqueBomVsRuimScreenStyles.instrucaoTexto}>Esse toque é bom ou ruim?</Text>
      </View>

      {/* Situation Card */}
      <View style={toqueBomVsRuimScreenStyles.cardArea}>
        <Animated.View style={[toqueBomVsRuimScreenStyles.card, { transform: [{ translateY: slideAnim }] }]}>
          <View
            style={[
              toqueBomVsRuimScreenStyles.cardIconeContainer,
              {
                backgroundColor:
                  fase.respostaCorreta === 'bom'
                    ? COLORS.toqueBom + '20'
                    : COLORS.toqueRuim + '20',
              },
            ]}
          >
            <Ionicons
              name={fase.respostaCorreta === 'bom' ? 'heart-outline' : 'alert-circle-outline'}
              size={56}
              color={fase.respostaCorreta === 'bom' ? COLORS.toqueBom : COLORS.toqueRuim}
            />
          </View>
          <Text style={toqueBomVsRuimScreenStyles.cardTexto}>{fase.texto}</Text>
        </Animated.View>
      </View>

      {/* Buttons */}
      <View style={toqueBomVsRuimScreenStyles.botoesContainer}>
        <TouchableOpacity
          style={[toqueBomVsRuimScreenStyles.botaoResposta, toqueBomVsRuimScreenStyles.botaoBom]}
          onPress={() => handleResposta('bom')}
          activeOpacity={0.8}
        >
          <Ionicons name="thumbs-up-outline" size={36} color={COLORS.textWhite} />
          <Text style={toqueBomVsRuimScreenStyles.botaoRespostaTexto}>Toque Bom</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[toqueBomVsRuimScreenStyles.botaoResposta, toqueBomVsRuimScreenStyles.botaoRuim]}
          onPress={() => handleResposta('ruim')}
          activeOpacity={0.8}
        >
          <Ionicons name="thumbs-down-outline" size={36} color={COLORS.textWhite} />
          <Text style={toqueBomVsRuimScreenStyles.botaoRespostaTexto}>Toque Ruim</Text>
        </TouchableOpacity>
      </View>

      <FeedbackModal
        visible={modalVisible}
        acertou={acertou}
        mensagem={mensagem}
        onClose={handleFecharModal}
      />
    </SafeAreaView>
  );
}