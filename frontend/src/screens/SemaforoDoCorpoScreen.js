import React, { useState, useCallback, useEffect } from 'react';
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
import { semaforoDoCorpoScreenStyles } from '../styles/SemaforoDoCorpoScreen.styles';
import { useAuth } from '../context/AuthContext';
import FeedbackModal from '../components/FeedbackModal';
import { jogosService } from '../services/api';

const getMensagemErro = (fase, corEscolhida) => {
  if (corEscolhida === 'verde') return fase.feedbacks.outroParaVerde;
  return fase.feedbacks.verdeParaOutro;
};

export default function SemaforoDoCorpoScreen({ navigation }) {
  const { atualizarProgresso } = useAuth();

  const [fases, setFases] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [faseAtual, setFaseAtual] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [concluido, setConcluido] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    jogosService
      .getSemaforo()
      .then((res) => setFases(res.data.fases))
      .catch(() => setErro('Não foi possível carregar o jogo. Tente novamente.'))
      .finally(() => setCarregando(false));
  }, []);

  const fase = fases[faseAtual];

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
      const correto = corEscolhida === fase.respostaCorreta;

      if (correto) {
        setAcertou(true);
        setMensagem(fase.feedbacks.correto);
        atualizarProgresso('semaforoDoCorpo', fase.id);
      } else {
        setAcertou(false);
        setMensagem(getMensagemErro(fase, corEscolhida));
      }
      setModalVisible(true);
    },
    [fase, animarCard, atualizarProgresso]
  );

  const handleFecharModal = useCallback(() => {
    setModalVisible(false);
    if (acertou) {
      if (faseAtual < fases.length - 1) {
        setFaseAtual((prev) => prev + 1);
      } else {
        setConcluido(true);
      }
    }
  }, [acertou, faseAtual, fases.length]);

  if (carregando) {
    return (
      <SafeAreaView style={semaforoDoCorpoScreenStyles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (erro) {
    return (
      <SafeAreaView style={semaforoDoCorpoScreenStyles.container}>
        <View style={semaforoDoCorpoScreenStyles.concluidoContainer}>
          <Ionicons name="cloud-offline-outline" size={64} color={COLORS.textLight} />
          <Text style={semaforoDoCorpoScreenStyles.concluidoTexto}>{erro}</Text>
          <TouchableOpacity style={semaforoDoCorpoScreenStyles.botaoVoltar} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.textWhite} />
            <Text style={semaforoDoCorpoScreenStyles.botaoVoltarTexto}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (concluido) {
    return (
      <SafeAreaView style={semaforoDoCorpoScreenStyles.container}>
        <View style={semaforoDoCorpoScreenStyles.concluidoContainer}>
          <View style={semaforoDoCorpoScreenStyles.concluidoIcone}>
            <Ionicons name="trophy-outline" size={80} color={COLORS.accent} />
          </View>
          <Text style={semaforoDoCorpoScreenStyles.concluidoTitulo}>Parabéns!</Text>
          <Text style={semaforoDoCorpoScreenStyles.concluidoTexto}>
            Você completou o Semáforo do Corpo! Agora você sabe identificar as
            partes do corpo que precisam de mais cuidado.
          </Text>
          <TouchableOpacity
            style={semaforoDoCorpoScreenStyles.botaoVoltar}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="home-outline" size={22} color={COLORS.textWhite} />
            <Text style={semaforoDoCorpoScreenStyles.botaoVoltarTexto}>Voltar ao início</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progresso = (faseAtual / fases.length) * 100;

  return (
    <SafeAreaView style={semaforoDoCorpoScreenStyles.container}>
      {/* Progress Bar */}
      <View style={semaforoDoCorpoScreenStyles.progressoContainer}>
        <View style={semaforoDoCorpoScreenStyles.progressoBarra}>
          <View style={[semaforoDoCorpoScreenStyles.progressoPreenchido, { width: `${progresso}%` }]} />
        </View>
        <Text style={semaforoDoCorpoScreenStyles.progressoTexto}>
          {faseAtual + 1} de {fases.length}
        </Text>
      </View>

      {/* Instruction */}
      <View style={semaforoDoCorpoScreenStyles.instrucaoContainer}>
        <Ionicons name="bulb-outline" size={20} color={COLORS.accent} />
        <Text style={semaforoDoCorpoScreenStyles.instrucaoTexto}>
          Qual a cor do semáforo para essa parte do corpo?
        </Text>
      </View>

      {/* Body Part Card */}
      <View style={semaforoDoCorpoScreenStyles.cardArea}>
        <Animated.View style={[semaforoDoCorpoScreenStyles.card, { transform: [{ scale: scaleAnim }] }]}>
          <View style={semaforoDoCorpoScreenStyles.cardIconeContainer}>
            <Ionicons name={fase.icone} size={64} color={COLORS.primary} />
          </View>
          <Text style={semaforoDoCorpoScreenStyles.cardTexto}>{fase.parteDoCorpo}</Text>
        </Animated.View>
      </View>

      {/* Semáforo Legend */}
      <View style={semaforoDoCorpoScreenStyles.legendaContainer}>
        <View style={semaforoDoCorpoScreenStyles.legendaItem}>
          <View style={[semaforoDoCorpoScreenStyles.legendaBola, { backgroundColor: COLORS.verde }]} />
          <Text style={semaforoDoCorpoScreenStyles.legendaTexto}>Seguro</Text>
        </View>
        <View style={semaforoDoCorpoScreenStyles.legendaItem}>
          <View style={[semaforoDoCorpoScreenStyles.legendaBola, { backgroundColor: COLORS.amarelo }]} />
          <Text style={semaforoDoCorpoScreenStyles.legendaTexto}>Atenção</Text>
        </View>
        <View style={semaforoDoCorpoScreenStyles.legendaItem}>
          <View style={[semaforoDoCorpoScreenStyles.legendaBola, { backgroundColor: COLORS.vermelho }]} />
          <Text style={semaforoDoCorpoScreenStyles.legendaTexto}>Privado</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={semaforoDoCorpoScreenStyles.botoesContainer}>
        <TouchableOpacity
          style={[semaforoDoCorpoScreenStyles.botaoCor, { backgroundColor: COLORS.verde }]}
          onPress={() => handleResposta('verde')}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle-outline" size={28} color="#FFFFFF" />
          <Text style={semaforoDoCorpoScreenStyles.botaoCorTexto}>Verde</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[semaforoDoCorpoScreenStyles.botaoCor, { backgroundColor: COLORS.amarelo }]}
          onPress={() => handleResposta('amarelo')}
          activeOpacity={0.8}
        >
          <Ionicons name="warning-outline" size={28} color="#FFFFFF" />
          <Text style={semaforoDoCorpoScreenStyles.botaoCorTexto}>Amarelo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[semaforoDoCorpoScreenStyles.botaoCor, { backgroundColor: COLORS.vermelho }]}
          onPress={() => handleResposta('vermelho')}
          activeOpacity={0.8}
        >
          <Ionicons name="close-circle-outline" size={28} color="#FFFFFF" />
          <Text style={semaforoDoCorpoScreenStyles.botaoCorTexto}>Vermelho</Text>
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