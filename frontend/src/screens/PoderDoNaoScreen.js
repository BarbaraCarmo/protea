import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { poderDoNaoScreenStyles as styles } from '../styles/PoderDoNaoScreen.styles';
import { useAuth } from '../context/AuthContext';
import FeedbackModal from '../components/FeedbackModal';
import { jogosService } from '../services/api';

export default function PoderDoNaoScreen({ navigation }) {
  const { atualizarProgresso } = useAuth();

  const [fases, setFases] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [faseAtual, setFaseAtual] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState('');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [concluido, setConcluido] = useState(false);

  useEffect(() => {
    jogosService
      .getPoderDoNao()
      .then((res) => setFases(res.data.fases))
      .catch(() => setErro('Não foi possível carregar o jogo. Tente novamente.'))
      .finally(() => setCarregando(false));
  }, []);

  const fase = fases[faseAtual];
  const totalFases = fases.length;
  const progresso = totalFases > 0 ? (faseAtual / totalFases) * 100 : 0;

  function selecionarOpcao(opcao, index) {
    if (!fase) return;
    setOpcaoSelecionada(index);

    const correto = opcao.tipo === 'firme';
    setAcertou(correto);

    const feedbackMap = {
      firme: fase.feedbackCorreto,
      passivo: fase.feedbackPassivo,
      agressivo: fase.feedbackAgressivo,
    };
    setMensagemFeedback(feedbackMap[opcao.tipo]);
    setModalVisible(true);

    if (correto) {
      atualizarProgresso('poderDoNao', fase.id);
    }
  }

  function fecharModal() {
    setModalVisible(false);
    setOpcaoSelecionada(null);

    if (acertou) {
      if (faseAtual < totalFases - 1) {
        setFaseAtual(faseAtual + 1);
      } else {
        setConcluido(true);
      }
    }
  }

  function getOpcaoStyle(tipo) {
    if (opcaoSelecionada === null) return {};
    switch (tipo) {
      case 'firme': return { borderColor: COLORS.success, borderWidth: 3 };
      case 'passivo': return { borderColor: COLORS.warning, borderWidth: 3 };
      case 'agressivo': return { borderColor: COLORS.error, borderWidth: 3 };
      default: return {};
    }
  }

  function getOpcaoIcon(tipo) {
    if (opcaoSelecionada === null) return null;
    switch (tipo) {
      case 'firme': return <Ionicons name="checkmark-circle" size={22} color={COLORS.success} />;
      case 'passivo': return <Ionicons name="alert-circle" size={22} color={COLORS.warning} />;
      case 'agressivo': return <Ionicons name="close-circle" size={22} color={COLORS.error} />;
      default: return null;
    }
  }

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
          <TouchableOpacity style={styles.concluidoBotao} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.textWhite} />
            <Text style={styles.concluidoBotaoTexto}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (concluido) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.concluidoContainer}>
          <View style={styles.concluidoIconContainer}>
            <Ionicons name="trophy-outline" size={80} color={COLORS.accent} />
          </View>
          <Text style={styles.concluidoTitulo}>Parabéns!</Text>
          <Text style={styles.concluidoTexto}>
            Você completou todas as fases do Poder do Não! Agora você sabe como
            dizer NÃO de forma firme e respeitosa.
          </Text>
          <TouchableOpacity
            style={styles.concluidoBotao}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="home-outline" size={20} color={COLORS.textWhite} />
            <Text style={styles.concluidoBotaoTexto}>Voltar ao Início</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Progress bar */}
        <View style={styles.progressoContainer}>
          <View style={styles.progressoBarra}>
            <View style={[styles.progressoPreenchido, { width: `${progresso}%` }]} />
          </View>
          <View style={styles.progressoInfo}>
            <Text style={styles.progressoTexto}>
              Fase {faseAtual + 1} de {totalFases}
            </Text>
          </View>
        </View>

        {/* Situation card */}
        <View style={styles.situacaoCard}>
          <View style={styles.situacaoIconContainer}>
            <Ionicons name="chatbubble-ellipses-outline" size={32} color={COLORS.accent} />
          </View>
          <Text style={styles.situacaoLabel}>Situação:</Text>
          <Text style={styles.situacaoTexto}>{fase.situacao}</Text>
        </View>

        {/* Instruction */}
        <Text style={styles.instrucao}>
          Como você responderia? Escolha a melhor opção:
        </Text>

        {/* Options */}
        {fase.opcoes.map((opcao, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.opcaoBotao,
              opcaoSelecionada === index && styles.opcaoSelecionada,
              opcaoSelecionada !== null && getOpcaoStyle(opcao.tipo),
            ]}
            onPress={() => selecionarOpcao(opcao, index)}
            disabled={opcaoSelecionada !== null}
            activeOpacity={0.7}
          >
            <View style={styles.opcaoConteudo}>
              <View style={styles.opcaoNumero}>
                <Text style={styles.opcaoNumeroTexto}>{index + 1}</Text>
              </View>
              <Text style={styles.opcaoTexto}>{opcao.texto}</Text>
              {opcaoSelecionada !== null && (
                <View style={styles.opcaoIcone}>{getOpcaoIcon(opcao.tipo)}</View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Dica */}
        <View style={styles.dicaContainer}>
          <Ionicons name="bulb-outline" size={20} color={COLORS.accent} />
          <Text style={styles.dicaTexto}>
            Lembre-se: você pode dizer NÃO de forma firme e educada!
          </Text>
        </View>
      </ScrollView>

      <FeedbackModal
        visible={modalVisible}
        acertou={acertou}
        mensagem={mensagemFeedback}
        onClose={fecharModal}
      />
    </SafeAreaView>
  );
}