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
    situacao:
      'Sua tia quer te dar um beijo, mas você não quer. O que você diz?',
    opcoes: [
      {
        texto: '"Tia, agora eu não quero beijo, mas te amo!"',
        tipo: 'firme',
      },
      {
        texto: '"Tá bom..." (deixa mesmo sem querer)',
        tipo: 'passivo',
      },
      {
        texto: '"Sai pra lá! Não encosta em mim!"',
        tipo: 'agressivo',
      },
    ],
  },
  {
    id: 2,
    situacao:
      'Seu primo diz "para de ser chato" quando você diz que não quer brincar daquele jeito. O que você faz?',
    opcoes: [
      {
        texto: '"Eu não sou chato. Só não quero brincar assim."',
        tipo: 'firme',
      },
      {
        texto: 'Fica quieto e faz o que ele quer.',
        tipo: 'passivo',
      },
      {
        texto: '"Chato é você! Nunca mais brinco com você!"',
        tipo: 'agressivo',
      },
    ],
  },
  {
    id: 3,
    situacao:
      'Um amigo quer te dar um abraço, mas você não está com vontade. O que você diz?',
    opcoes: [
      {
        texto: '"Agora não quero abraço, mas podemos brincar juntos!"',
        tipo: 'firme',
      },
      {
        texto: 'Aceita o abraço mesmo sem querer.',
        tipo: 'passivo',
      },
      {
        texto: '"Não me toca! Sai de perto!"',
        tipo: 'agressivo',
      },
    ],
  },
  {
    id: 4,
    situacao:
      'Um adulto que você conhece pouco pede um abraço. O que você faz?',
    opcoes: [
      {
        texto: '"Prefiro dar um tchau com a mão!"',
        tipo: 'firme',
      },
      {
        texto: 'Dá o abraço para não parecer mal educado.',
        tipo: 'passivo',
      },
      {
        texto: '"Você é estranho! Não vou te abraçar!"',
        tipo: 'agressivo',
      },
    ],
  },
  {
    id: 5,
    situacao:
      'O mesmo adulto insiste: "Ah, só um abraçinho, não custa nada!" O que você faz?',
    opcoes: [
      {
        texto: '"Eu já disse que não quero. Meu corpo, minha escolha."',
        tipo: 'firme',
      },
      {
        texto: 'Dá o abraço porque ele insistiu muito.',
        tipo: 'passivo',
      },
      {
        texto: 'Grita e empurra a pessoa.',
        tipo: 'agressivo',
      },
    ],
  },
  {
    id: 6,
    situacao:
      'Um colega propõe uma brincadeira de tirar a roupa. O que você faz?',
    opcoes: [
      {
        texto: '"Essa brincadeira não é legal. Vamos brincar de outra coisa!"',
        tipo: 'firme',
      },
      {
        texto: 'Aceita porque não quer ficar de fora.',
        tipo: 'passivo',
      },
      {
        texto: '"Você é muito nojento! Vou contar pra todo mundo!"',
        tipo: 'agressivo',
      },
    ],
  },
  {
    id: 7,
    situacao:
      'O colega insiste: "Todo mundo faz isso, não seja medroso!" O que você faz?',
    opcoes: [
      {
        texto: '"Não importa o que os outros fazem. Eu não quero e pronto."',
        tipo: 'firme',
      },
      {
        texto: 'Aceita para não ser chamado de medroso.',
        tipo: 'passivo',
      },
      {
        texto: 'Bate no colega para ele parar.',
        tipo: 'agressivo',
      },
    ],
  },
  {
    id: 8,
    situacao:
      'Um familiar pede para você sentar no colo dele e você não quer. O que você faz?',
    opcoes: [
      {
        texto: '"Prefiro sentar aqui do lado!"',
        tipo: 'firme',
      },
      {
        texto: 'Senta no colo para não magoar a pessoa.',
        tipo: 'passivo',
      },
      {
        texto: '"Me deixa em paz! Não quero ficar perto de você!"',
        tipo: 'agressivo',
      },
    ],
  },
  {
    id: 9,
    situacao:
      'O familiar fica triste e diz: "Você não me ama mais?" O que você faz?',
    opcoes: [
      {
        texto: '"Eu amo você sim! Mas não quero sentar no colo agora."',
        tipo: 'firme',
      },
      {
        texto: 'Se sente culpado e senta no colo.',
        tipo: 'passivo',
      },
      {
        texto: '"Para de fazer drama! Eu falei que não!"',
        tipo: 'agressivo',
      },
    ],
  },
  {
    id: 10,
    situacao:
      'Um adulto te dá um presente e diz: "Esse é nosso segredo, tá?" O que você faz?',
    opcoes: [
      {
        texto: '"Eu não guardo segredo de adulto. Vou contar pro meu responsável."',
        tipo: 'firme',
      },
      {
        texto: 'Aceita o presente e guarda o segredo.',
        tipo: 'passivo',
      },
      {
        texto: 'Joga o presente no chão e sai correndo.',
        tipo: 'agressivo',
      },
    ],
  },
  {
    id: 11,
    situacao:
      'Um adulto diz: "Se você contar pra sua mãe, vai se dar mal!" O que você faz?',
    opcoes: [
      {
        texto: '"Ameaça não muda nada. Vou contar sim para quem eu confio."',
        tipo: 'firme',
      },
      {
        texto: 'Fica com medo e não conta nada.',
        tipo: 'passivo',
      },
      {
        texto: '"Eu vou te bater se você não parar!"',
        tipo: 'agressivo',
      },
    ],
  },
  {
    id: 12,
    situacao:
      'Você está sozinho e um adulto tenta se aproximar de um jeito que te deixa desconfortável. O que você faz?',
    opcoes: [
      {
        texto: '"NÃO! Sai de perto!" e corre para um lugar seguro contar para alguém de confiança.',
        tipo: 'firme',
      },
      {
        texto: 'Fica parado sem saber o que fazer.',
        tipo: 'passivo',
      },
      {
        texto: 'Tenta enfrentar o adulto sozinho.',
        tipo: 'agressivo',
      },
    ],
  },
];

const FEEDBACK = {
  firme:
    'Parabéns! Você disse NÃO de um jeito firme e respeitoso. Isso é ter o Poder do Não!',
  passivo:
    'Você merece ter sua vontade respeitada. Vamos tentar de novo?',
  agressivo:
    'Sentir raiva é normal, mas existe uma forma de ser firme sem brigar. Vamos tentar?',
};

export default function PoderDoNaoScreen({ navigation }) {
  const { atualizarProgresso } = useAuth();
  const [faseAtual, setFaseAtual] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState('');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [concluido, setConcluido] = useState(false);

  const fase = FASES[faseAtual];
  const totalFases = FASES.length;
  const progresso = (faseAtual / totalFases) * 100;

  function selecionarOpcao(opcao, index) {
    setOpcaoSelecionada(index);

    const correto = opcao.tipo === 'firme';
    setAcertou(correto);
    setMensagemFeedback(FEEDBACK[opcao.tipo]);
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
      case 'firme':
        return { borderColor: COLORS.success, borderWidth: 3 };
      case 'passivo':
        return { borderColor: COLORS.warning, borderWidth: 3 };
      case 'agressivo':
        return { borderColor: COLORS.error, borderWidth: 3 };
      default:
        return {};
    }
  }

  function getOpcaoIcon(tipo) {
    if (opcaoSelecionada === null) return null;
    switch (tipo) {
      case 'firme':
        return <Ionicons name="checkmark-circle" size={22} color={COLORS.success} />;
      case 'passivo':
        return <Ionicons name="alert-circle" size={22} color={COLORS.warning} />;
      case 'agressivo':
        return <Ionicons name="close-circle" size={22} color={COLORS.error} />;
      default:
        return null;
    }
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.voltarBotao}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitulo}>O Poder do Não</Text>
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

        {/* Situation card */}
        <View style={styles.situacaoCard}>
          <View style={styles.situacaoIconContainer}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={32}
              color={COLORS.accent}
            />
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
    color: COLORS.accent,
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
    backgroundColor: COLORS.accent,
    borderRadius: 6,
  },
  situacaoCard: {
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
    borderLeftColor: COLORS.accent,
  },
  situacaoIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.accent + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  situacaoLabel: {
    fontSize: SIZES.md,
    color: COLORS.textLight,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  situacaoTexto: {
    fontSize: SIZES.xl,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '500',
  },
  instrucao: {
    fontSize: SIZES.lg,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
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
  opcaoSelecionada: {
    elevation: 4,
    shadowOpacity: 0.15,
  },
  opcaoConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  opcaoNumero: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.accent + '25',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  opcaoNumeroTexto: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  opcaoTexto: {
    fontSize: SIZES.lg,
    color: COLORS.text,
    flex: 1,
    lineHeight: 24,
  },
  opcaoIcone: {
    marginLeft: 10,
  },
  dicaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent + '15',
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
    backgroundColor: COLORS.accent + '20',
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
    backgroundColor: COLORS.accent,
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
