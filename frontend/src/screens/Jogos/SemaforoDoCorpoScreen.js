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
import { COLORS } from '../../constants/colors';
import { imagemJogo } from '../../constants/imagemAssets';
import { semaforoDoCorpoScreenStyles as styles } from '../../styles/Jogos/JogosTemas.styles';
import { useAuth } from '../../context/AuthContext';
import CardImagem from '../../components/CardImagem';
import FeedbackModal from '../../components/FeedbackModal';
import { jogosService } from '../../services/api';

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
          <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.textWhite} />
            <Text style={styles.botaoVoltarTexto}>Voltar</Text>
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
            <Ionicons name="trophy-outline" size={80} color={COLORS.accent} />
          </View>
          <Text style={styles.concluidoTitulo}>Parabéns!</Text>
          <Text style={styles.concluidoTexto}>
            Você completou o Semáforo do Corpo! Agora você sabe identificar as
            partes do corpo que precisam de mais cuidado.
          </Text>
          <TouchableOpacity
            style={styles.botaoVoltar}
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

      {/* Área central: card + instrução abaixo */}
      <View style={styles.cardArea}>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.cardImagemArea}>
            <CardImagem source={imagemJogo.semaforoDoCorpo} width={150} height={150} />
          </View>
          <Text style={styles.cardLabel}>{fase.parteDoCorpo}</Text>
        </Animated.View>

        {/* Instrução abaixo do card */}
        <Text style={styles.situacaoDescricao}>
          Qual a cor do semáforo para essa parte do corpo?
        </Text>
      </View>

      {/* Legenda */}
      <View style={styles.legendaContainer}>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaBola, { backgroundColor: COLORS.verde }]} />
          <Text style={styles.legendaTexto}>Seguro</Text>
        </View>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaBola, { backgroundColor: COLORS.amarelo }]} />
          <Text style={styles.legendaTexto}>Atenção</Text>
        </View>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaBola, { backgroundColor: COLORS.vermelho }]} />
          <Text style={styles.legendaTexto}>Privado</Text>
        </View>
      </View>

      {/* Botões de resposta */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botaoCor, { backgroundColor: COLORS.verde }]}
          onPress={() => handleResposta('verde')}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle-outline" size={28} color="#FFFFFF" />
          <Text style={styles.botaoCorTexto}>Verde</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoCor, { backgroundColor: COLORS.amarelo }]}
          onPress={() => handleResposta('amarelo')}
          activeOpacity={0.8}
        >
          <Ionicons name="warning-outline" size={28} color="#FFFFFF" />
          <Text style={styles.botaoCorTexto}>Amarelo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoCor, { backgroundColor: COLORS.vermelho }]}
          onPress={() => handleResposta('vermelho')}
          activeOpacity={0.8}
        >
          <Ionicons name="close-circle-outline" size={28} color="#FFFFFF" />
          <Text style={styles.botaoCorTexto}>Vermelho</Text>
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
