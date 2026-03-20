import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import FeedbackModal from '../components/FeedbackModal';

const FASES = [
  {
    id: 1,
    pergunta: 'Quem são os adultos de confiança?',
    dica: 'Você pode escolher mais de uma opção!',
    multipla: true,
    opcoes: [
      { texto: 'Mãe / Pai', correto: true },
      { texto: 'Professor(a)', correto: true },
      { texto: 'Desconhecido', correto: false },
      { texto: 'Avó / Avô', correto: true },
    ],
    feedbackCorreto:
      'Isso mesmo! Mãe, pai, professor(a) e avós são exemplos de adultos de confiança!',
    feedbackErrado:
      'Cuidado! Desconhecidos não são adultos de confiança. Adultos de confiança são pessoas que você conhece bem e que cuidam de você.',
  },
  {
    id: 2,
    pergunta: 'Se algo te deixar triste ou desconfortável, o que você deve fazer?',
    dica: 'Escolha a melhor opção:',
    multipla: false,
    opcoes: [
      { texto: 'Guardar segredo', correto: false },
      { texto: 'Contar para um adulto de confiança', correto: true },
      { texto: 'Fingir que nada aconteceu', correto: false },
    ],
    feedbackCorreto:
      'Muito bem! Sempre conte para um adulto de confiança quando algo te deixar triste ou desconfortável.',
    feedbackErrado:
      'Hmm, essa não é a melhor escolha. Quando algo te deixar triste, o melhor é contar para um adulto de confiança!',
  },
  {
    id: 3,
    pergunta: 'Um adulto de confiança é alguém que...',
    dica: 'Pense em quem realmente cuida de você:',
    multipla: false,
    opcoes: [
      { texto: 'Dá presentes e pede segredos', correto: false },
      { texto: 'Ouve você e te protege', correto: true },
      { texto: 'Pede para guardar segredos ruins', correto: false },
    ],
    feedbackCorreto:
      'Perfeito! Um adulto de confiança é alguém que ouve você, te protege e nunca pede segredos ruins.',
    feedbackErrado:
      'Cuidado! Um adulto de confiança é alguém que ouve você e te protege, nunca alguém que pede segredos.',
  },
  {
    id: 4,
    pergunta: 'Você pode ter mais de um adulto de confiança?',
    dica: 'Pense nas pessoas que cuidam de você:',
    multipla: false,
    opcoes: [
      { texto: 'Sim, posso ter vários!', correto: true },
      { texto: 'Não, só posso ter um.', correto: false },
    ],
    feedbackCorreto:
      'Isso aí! Você pode ter vários adultos de confiança: pais, avós, tios, professores...',
    feedbackErrado:
      'Na verdade, você pode ter vários adultos de confiança! Quanto mais, melhor.',
  },
  {
    id: 5,
    pergunta: 'Se um adulto de confiança não puder te ajudar, o que você faz?',
    dica: 'Nunca desista de pedir ajuda!',
    multipla: false,
    opcoes: [
      { texto: 'Desisto de pedir ajuda', correto: false },
      { texto: 'Procuro outro adulto de confiança', correto: true },
      { texto: 'Fico bravo e não falo mais nada', correto: false },
    ],
    feedbackCorreto:
      'Muito bem! Se um adulto não puder ajudar, procure outro. Nunca desista de pedir ajuda!',
    feedbackErrado:
      'Nunca desista! Se um adulto de confiança não puder ajudar, procure outro até alguém te ajudar.',
  },
];

export default function AdultosDeConfiancaScreen({ navigation }) {
  const { atualizarProgresso } = useAuth();
  const [faseAtual, setFaseAtual] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState('');
  const [selecionados, setSelecionados] = useState([]);
  const [respondido, setRespondido] = useState(false);
  const [concluido, setConcluido] = useState(false);

  const fase = FASES[faseAtual];
  const totalFases = FASES.length;
  const progresso = (faseAtual / totalFases) * 100;

  function toggleSelecao(index) {
    if (respondido) return;

    if (fase.multipla) {
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
    if (fase.multipla) {
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
      const indiceSelecionado = selecionadosFinal[0];
      correto = fase.opcoes[indiceSelecionado].correto;
    }

    setAcertou(correto);
    setMensagemFeedback(
      correto ? fase.feedbackCorreto : fase.feedbackErrado
    );
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
        return {
          borderColor: COLORS.primary,
          borderWidth: 3,
          backgroundColor: COLORS.primary + '10',
        };
      }
      return {};
    }

    const opcao = fase.opcoes[index];
    if (opcao.correto) {
      return {
        borderColor: COLORS.success,
        borderWidth: 3,
        backgroundColor: COLORS.success + '10',
      };
    }
    if (selecionados.includes(index) && !opcao.correto) {
      return {
        borderColor: COLORS.error,
        borderWidth: 3,
        backgroundColor: COLORS.error + '10',
      };
    }
    return {};
  }

  function getOpcaoIcone(index) {
    if (!respondido) {
      if (selecionados.includes(index)) {
        return (
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={COLORS.primary}
          />
        );
      }
      return (
        <Ionicons
          name="ellipse-outline"
          size={24}
          color={COLORS.border}
        />
      );
    }

    const opcao = fase.opcoes[index];
    if (opcao.correto) {
      return (
        <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
      );
    }
    if (selecionados.includes(index)) {
      return <Ionicons name="close-circle" size={24} color={COLORS.error} />;
    }
    return <Ionicons name="ellipse-outline" size={24} color={COLORS.border} />;
  }

  if (concluido) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.concluidoContainer}>
          <View style={styles.concluidoIconContainer}>
            <Ionicons name="people-outline" size={80} color={COLORS.warm} />
          </View>
          <Text style={styles.concluidoTitulo}>Parabéns!</Text>
          <Text style={styles.concluidoTexto}>
            Você completou todas as fases! Agora você sabe identificar os
            adultos de confiança e como pedir ajuda quando precisar.
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.voltarBotao}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitulo}>Adultos de Confiança</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Progress bar */}
        <View style={styles.progressoContainer}>
          <View style={styles.progressoInfo}>
            <Text style={styles.progressoTexto}>
              Fase {faseAtual + 1} de {totalFases}
            </Text>
            <Text style={styles.progressoPorcentagem}>
              {Math.round(progresso)}%
            </Text>
          </View>
          <View style={styles.progressoBarra}>
            <View
              style={[styles.progressoPreenchido, { width: `${progresso}%` }]}
            />
          </View>
        </View>

        {/* Question card */}
        <View style={styles.perguntaCard}>
          <View style={styles.perguntaIconContainer}>
            <Ionicons
              name="help-circle-outline"
              size={36}
              color={COLORS.warm}
            />
          </View>
          <Text style={styles.perguntaTexto}>{fase.pergunta}</Text>
          <Text style={styles.perguntaDica}>{fase.dica}</Text>
          {fase.multipla && (
            <View style={styles.multiplaTag}>
              <Ionicons name="layers-outline" size={16} color={COLORS.primary} />
              <Text style={styles.multiplaTagTexto}>
                Selecione todas as corretas
              </Text>
            </View>
          )}
        </View>

        {/* Options */}
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

        {/* Confirm button for multiple selection */}
        {fase.multipla && !respondido && selecionados.length > 0 && (
          <TouchableOpacity
            style={styles.confirmarBotao}
            onPress={() => verificarResposta()}
            activeOpacity={0.7}
          >
            <Ionicons
              name="checkmark-done-outline"
              size={22}
              color={COLORS.textWhite}
            />
            <Text style={styles.confirmarBotaoTexto}>Confirmar Resposta</Text>
          </TouchableOpacity>
        )}

        {/* Tip */}
        <View style={styles.dicaContainer}>
          <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.warm} />
          <Text style={styles.dicaTexto}>
            Adultos de confiança são pessoas que cuidam de você, te ouvem e te
            protegem!
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  voltarBotao: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitulo: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  progressoContainer: {
    marginBottom: 24,
  },
  progressoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressoTexto: {
    fontSize: SIZES.md,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  progressoPorcentagem: {
    fontSize: SIZES.md,
    color: COLORS.warm,
    fontWeight: 'bold',
  },
  progressoBarra: {
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressoPreenchido: {
    height: '100%',
    backgroundColor: COLORS.warm,
    borderRadius: 6,
  },
  perguntaCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warm,
  },
  perguntaIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.warm + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  perguntaTexto: {
    fontSize: SIZES.xl,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  perguntaDica: {
    fontSize: SIZES.md,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  multiplaTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: SIZES.radiusSm,
    marginTop: 12,
    gap: 6,
  },
  multiplaTagTexto: {
    fontSize: SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  opcaoBotao: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: 18,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  opcaoConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  opcaoCheckbox: {
    marginRight: 14,
  },
  opcaoTexto: {
    fontSize: SIZES.lg,
    color: COLORS.text,
    flex: 1,
    lineHeight: 24,
    fontWeight: '500',
  },
  confirmarBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radius,
    marginTop: 4,
    marginBottom: 12,
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  confirmarBotaoTexto: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textWhite,
  },
  dicaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warm + '15',
    borderRadius: SIZES.radius,
    padding: 14,
    marginTop: 8,
  },
  dicaTexto: {
    fontSize: SIZES.md,
    color: COLORS.text,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  concluidoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  concluidoIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.warm + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  concluidoTitulo: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 14,
  },
  concluidoTexto: {
    fontSize: SIZES.lg,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 30,
  },
  concluidoBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warm,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: SIZES.radius,
    gap: 10,
  },
  concluidoBotaoTexto: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textWhite,
  },
});
