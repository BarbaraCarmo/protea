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
import { COLORS } from '../../constants/colors';
import { imagemJogo } from '../../constants/imagemAssets';
import { adultosDeConfiancaScreenStyles as styles } from '../../styles/Jogos/JogosTemas.styles';
import { useAuth } from '../../context/AuthContext';
import CardImagem from '../../components/CardImagem';
import FeedbackModal from '../../components/FeedbackModal';
import { jogosService } from '../../services/api';

export default function AdultosDeConfiancaScreen({ navigation }) {
  const { atualizarProgresso } = useAuth();

  const [fases, setFases] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [faseAtual, setFaseAtual] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState('');
  const [selecionados, setSelecionados] = useState([]);
  const [respondido, setRespondido] = useState(false);
  const [concluido, setConcluido] = useState(false);

  useEffect(() => {
    jogosService
      .getAdultosConfianca()
      .then((res) => setFases(res.data.fases))
      .catch(() => setErro('Não foi possível carregar o jogo. Tente novamente.'))
      .finally(() => setCarregando(false));
  }, []);

  const fase = fases[faseAtual];
  const totalFases = fases.length;
  const progresso = totalFases > 0 ? (faseAtual / totalFases) * 100 : 0;

  function toggleSelecao(index) {
    if (respondido || !fase) return;

    if (fase.tipo === 'selecao_multipla') {
      setSelecionados((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setSelecionados([index]);
      verificarResposta([index]);
    }
  }

  function verificarResposta(selecionadosAtual) {
    const selecionadosFinal = selecionadosAtual || selecionados;
    setRespondido(true);

    let correto;
    if (fase.tipo === 'selecao_multipla') {
      const corretos = fase.opcoes.map((o, i) => (o.correto ? i : -1)).filter((i) => i !== -1);
      const errados = fase.opcoes.map((o, i) => (!o.correto ? i : -1)).filter((i) => i !== -1);
      const selecionouTodosCorretos = corretos.every((i) => selecionadosFinal.includes(i));
      const naoSelecionouErrados = errados.every((i) => !selecionadosFinal.includes(i));
      correto = selecionouTodosCorretos && naoSelecionouErrados;
    } else {
      correto = fase.opcoes[selecionadosFinal[0]].correto;
    }

    setAcertou(correto);
    setMensagemFeedback(correto ? fase.feedbackCorreto : fase.feedbackIncorreto);
    setModalVisible(true);

    if (correto) {
      atualizarProgresso('adultoDeConfianca', fase.id);
    }
  }

  function fecharModal() {
    setModalVisible(false);
    if (acertou) {
      if (faseAtual < totalFases - 1) {
        setFaseAtual(faseAtual + 1);
        setSelecionados([]);
        setRespondido(false);
      } else {
        setConcluido(true);
      }
    } else {
      setSelecionados([]);
      setRespondido(false);
    }
  }

  function getOpcaoEstilo(index) {
    if (!respondido) {
      if (selecionados.includes(index)) {
        return { borderColor: COLORS.primary, borderWidth: 3, backgroundColor: COLORS.primary + '10' };
      }
      return {};
    }
    const opcao = fase.opcoes[index];
    if (opcao.correto) {
      return { borderColor: COLORS.success, borderWidth: 3, backgroundColor: COLORS.success + '10' };
    }
    if (selecionados.includes(index) && !opcao.correto) {
      return { borderColor: COLORS.error, borderWidth: 3, backgroundColor: COLORS.error + '10' };
    }
    return {};
  }

  function getOpcaoIcone(index) {
    const isMultipla = fase.tipo === 'selecao_multipla';
    if (!respondido) {
      if (selecionados.includes(index)) {
        return <Ionicons name={isMultipla ? 'checkbox' : 'radio-button-on'} size={24} color={COLORS.primary} />;
      }
      return <Ionicons name={isMultipla ? 'square-outline' : 'radio-button-off'} size={24} color={COLORS.border} />;
    }
    const opcao = fase.opcoes[index];
    if (opcao.correto) {
      return <Ionicons name={isMultipla ? 'checkbox' : 'radio-button-on'} size={24} color={COLORS.success} />;
    }
    if (selecionados.includes(index)) {
      return <Ionicons name={isMultipla ? 'checkbox-outline' : 'radio-button-on'} size={24} color={COLORS.error} />;
    }
    return <Ionicons name={isMultipla ? 'square-outline' : 'radio-button-off'} size={24} color={COLORS.border} />;
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
          <TouchableOpacity
            style={[styles.botaoConclusao, { backgroundColor: COLORS.warm }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.textWhite} />
            <Text style={styles.botaoConclusaoTexto}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (concluido) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.concluidoContainer}>
          <View
            style={[styles.concluidoIconContainer, { backgroundColor: COLORS.warm + '20' }]}
          >
            <Ionicons name="people-outline" size={80} color={COLORS.warm} />
          </View>
          <Text style={styles.concluidoTitulo}>Parabéns!</Text>
          <Text style={styles.concluidoTexto}>
            Você completou todas as fases! Agora você sabe identificar os
            adultos de confiança e como pedir ajuda quando precisar.
          </Text>
          <TouchableOpacity
            style={[styles.botaoConclusao, { backgroundColor: COLORS.warm }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="home-outline" size={20} color={COLORS.textWhite} />
            <Text style={styles.botaoConclusaoTexto}>Voltar ao Início</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Barra de progresso */}
        <View style={styles.progressoContainerJogos}>
          <View style={styles.progressoBarra}>
            <View
              style={[styles.progressoPreenchidoWarm, { width: `${progresso}%` }]}
            />
          </View>
          <View style={styles.progressoInfo}>
            <Text style={styles.progressoTexto}>
              Fase {faseAtual + 1} de {totalFases}
            </Text>
          </View>
        </View>

        {/* Card com imagem ilustrativa — mesma para todas as fases deste jogo */}
        <View style={styles.card}>
          <View style={styles.cardImagemArea}>
            <CardImagem
              source={imagemJogo.adultoDeConfianca}
              width={150}
              height={150}
              cor={COLORS.warm}
            />
          </View>
        </View>

        {/* Pergunta — abaixo do card */}
        <Text style={styles.situacaoDescricao}>{fase.pergunta}</Text>

        {/* Tag de seleção múltipla — abaixo do texto */}
        {fase.tipo === 'selecao_multipla' && (
          <View style={styles.multiplaTag}>
            <Ionicons name="layers-outline" size={16} color={COLORS.primary} />
            <Text style={styles.multiplaTagTexto}>Selecione todas as corretas</Text>
          </View>
        )}

        {/* Opções */}
        {fase.opcoes.map((opcao, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.opcaoBotao, getOpcaoEstilo(index)]}
            onPress={() => toggleSelecao(index)}
            disabled={respondido}
            activeOpacity={0.7}
          >
            <View style={styles.opcaoConteudo}>
              <View style={styles.opcaoCheckbox}>
                {getOpcaoIcone(index)}
              </View>
              <Text style={styles.opcaoTexto}>{opcao.texto}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Botão confirmar (seleção múltipla) */}
        {fase.tipo === 'selecao_multipla' && !respondido && selecionados.length > 0 && (
          <TouchableOpacity
            style={styles.confirmarBotao}
            onPress={() => verificarResposta()}
            activeOpacity={0.7}
          >
            <Ionicons name="checkmark-done-outline" size={22} color={COLORS.textWhite} />
            <Text style={styles.confirmarBotaoTexto}>Confirmar Resposta</Text>
          </TouchableOpacity>
        )}

        {/* Dica */}
        <View style={[styles.dicaContainer, { backgroundColor: COLORS.warm + '15' }]}>
          <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.warm} />
          <Text style={styles.dicaTexto}>
            Adultos de confiança são pessoas que cuidam de você, te ouvem e te protegem!
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
