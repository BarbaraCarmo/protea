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
import { adultosDeConfiancaScreenStyles} from '../styles/AdultosDeConfiancaScreen.styles';
import { useAuth } from '../context/AuthContext';
import FeedbackModal from '../components/FeedbackModal';
import { jogosService } from '../services/api';

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
      const corretos = fase.opcoes
        .map((o, i) => (o.correto ? i : -1))
        .filter((i) => i !== -1);
      const errados = fase.opcoes
        .map((o, i) => (!o.correto ? i : -1))
        .filter((i) => i !== -1);

      const selecionouTodosCorretos = corretos.every((i) =>
        selecionadosFinal.includes(i)
      );
      const naoSelecionouErrados = errados.every(
        (i) => !selecionadosFinal.includes(i)
      );
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
        return (
          <Ionicons
            name={isMultipla ? 'checkbox' : 'radio-button-on'}
            size={24}
            color={COLORS.primary}
          />
        );
      }
      return (
        <Ionicons
          name={isMultipla ? 'square-outline' : 'radio-button-off'}
          size={24}
          color={COLORS.border}
        />
      );
    }

    const opcao = fase.opcoes[index];
    if (opcao.correto) {
      return (
        <Ionicons
          name={isMultipla ? 'checkbox' : 'radio-button-on'}
          size={24}
          color={COLORS.success}
        />
      );
    }
    if (selecionados.includes(index)) {
      return (
        <Ionicons
          name={isMultipla ? 'checkbox-outline' : 'radio-button-on'}
          size={24}
          color={COLORS.error}
        />
      );
    }
    return (
      <Ionicons
        name={isMultipla ? 'square-outline' : 'radio-button-off'}
        size={24}
        color={COLORS.border}
      />
    );
  }

  if (carregando) {
    return (
      <SafeAreaView style={adultosDeConfiancaScreenStyles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (erro) {
    return (
      <SafeAreaView style={adultosDeConfiancaScreenStyles.container}>
        <View style={adultosDeConfiancaScreenStyles.concluidoContainer}>
          <Ionicons name="cloud-offline-outline" size={64} color={COLORS.textLight} />
          <Text style={adultosDeConfiancaScreenStyles.concluidoTexto}>{erro}</Text>
          <TouchableOpacity style={adultosDeConfiancaScreenStyles.concluidoBotao} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.textWhite} />
            <Text style={adultosDeConfiancaScreenStyles.concluidoBotaoTexto}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (concluido) {
    return (
      <SafeAreaView style={adultosDeConfiancaScreenStyles.container}>
        <View style={adultosDeConfiancaScreenStyles.concluidoContainer}>
          <View style={adultosDeConfiancaScreenStyles.concluidoIconContainer}>
            <Ionicons name="people-outline" size={80} color={COLORS.warm} />
          </View>
          <Text style={adultosDeConfiancaScreenStyles.concluidoTitulo}>Parabéns!</Text>
          <Text style={adultosDeConfiancaScreenStyles.concluidoTexto}>
            Você completou todas as fases! Agora você sabe identificar os
            adultos de confiança e como pedir ajuda quando precisar.
          </Text>
          <TouchableOpacity
            style={adultosDeConfiancaScreenStyles.concluidoBotao}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="home-outline" size={20} color={COLORS.textWhite} />
            <Text style={adultosDeConfiancaScreenStyles.concluidoBotaoTexto}>Voltar ao Início</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={adultosDeConfiancaScreenStyles.container}>
      <ScrollView contentContainerStyle={adultosDeConfiancaScreenStyles.content}>
        {/* Progress bar */}
        <View style={adultosDeConfiancaScreenStyles.progressoContainer}>
          <View style={adultosDeConfiancaScreenStyles.progressoBarra}>
            <View style={[adultosDeConfiancaScreenStyles.progressoPreenchido, { width: `${progresso}%` }]} />
          </View>
          <View style={adultosDeConfiancaScreenStyles.progressoInfo}>
            <Text style={adultosDeConfiancaScreenStyles.progressoTexto}>
              Fase {faseAtual + 1} de {totalFases}
            </Text>
          </View>
        </View>

        {/* Question card */}
        <View style={adultosDeConfiancaScreenStyles.perguntaCard}>
          <View style={adultosDeConfiancaScreenStyles.perguntaIconContainer}>
            <Ionicons name="help-circle-outline" size={36} color={COLORS.warm} />
          </View>
          <Text style={adultosDeConfiancaScreenStyles.perguntaTexto}>{fase.pergunta}</Text>
          {fase.tipo === 'selecao_multipla' && (
            <View style={adultosDeConfiancaScreenStyles.multiplaTag}>
              <Ionicons name="layers-outline" size={16} color={COLORS.primary} />
              <Text style={adultosDeConfiancaScreenStyles.multiplaTagTexto}>Selecione todas as corretas</Text>
            </View>
          )}
        </View>

        {/* Options */}
        {fase.opcoes.map((opcao, index) => (
          <TouchableOpacity
            key={index}
            style={[adultosDeConfiancaScreenStyles.opcaoBotao, getOpcaoEstilo(index)]}
            onPress={() => toggleSelecao(index)}
            disabled={respondido}
            activeOpacity={0.7}
          >
            <View style={adultosDeConfiancaScreenStyles.opcaoConteudo}>
              <View style={adultosDeConfiancaScreenStyles.opcaoCheckbox}>
                {getOpcaoIcone(index)}
              </View>
              <Text style={adultosDeConfiancaScreenStyles.opcaoTexto}>{opcao.texto}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Confirm button for multiple selection */}
        {fase.tipo === 'selecao_multipla' && !respondido && selecionados.length > 0 && (
          <TouchableOpacity
            style={adultosDeConfiancaScreenStyles.confirmarBotao}
            onPress={() => verificarResposta()}
            activeOpacity={0.7}
          >
            <Ionicons name="checkmark-done-outline" size={22} color={COLORS.textWhite} />
            <Text style={adultosDeConfiancaScreenStyles.confirmarBotaoTexto}>Confirmar Resposta</Text>
          </TouchableOpacity>
        )}

        {/* Tip */}
        <View style={adultosDeConfiancaScreenStyles.dicaContainer}>
          <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.warm} />
          <Text style={adultosDeConfiancaScreenStyles.dicaTexto}>
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