import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import FeedbackModal from '../components/FeedbackModal';

const FASES = [
  { id: 1, parte: 'Braços', cor: 'verde', icone: 'fitness-outline' },
  { id: 2, parte: 'Cabeça', cor: 'verde', icone: 'happy-outline' },
  { id: 3, parte: 'Ombros', cor: 'verde', icone: 'body-outline' },
  { id: 4, parte: 'Parte superior das costas', cor: 'verde', icone: 'body-outline' },
  { id: 5, parte: 'Joelhos e coxas', cor: 'amarelo', icone: 'walk-outline' },
  { id: 6, parte: 'Barriga', cor: 'amarelo', icone: 'ellipse-outline' },
  { id: 7, parte: 'Pés e mãos', cor: 'amarelo', icone: 'hand-left-outline' },
  { id: 8, parte: 'Bumbum', cor: 'vermelho', icone: 'alert-circle-outline' },
  { id: 9, parte: 'Boca', cor: 'vermelho', icone: 'alert-circle-outline' },
  { id: 10, parte: 'Partes íntimas', cor: 'vermelho', icone: 'alert-circle-outline' },
];

const COR_LABEL = {
  verde: 'Verde',
  amarelo: 'Amarelo',
  vermelho: 'Vermelho',
};

const COR_HEX = {
  verde: COLORS.verde,
  amarelo: COLORS.amarelo,
  vermelho: COLORS.vermelho,
};

const ICONE_COR = {
  verde: 'ellipse',
  amarelo: 'ellipse',
  vermelho: 'ellipse',
};

function getMensagemErro(corCorreta, corEscolhida) {
  // Green classified as yellow or red
  if (corCorreta === 'verde' && (corEscolhida === 'amarelo' || corEscolhida === 'vermelho')) {
    return 'Essa parte do corpo não é perigosa de ser tocada, mas se estiver desconfortável lembre-se de estabelecer seus limites. Você não está sozinho e seu corpo é seu!';
  }
  // Red or Yellow classified as green
  if ((corCorreta === 'vermelho' || corCorreta === 'amarelo') && corEscolhida === 'verde') {
    return 'Cuidado! Essa área do seu corpo não deve ser tocada por qualquer um. Vamos tentar de novo?';
  }
  // Yellow classified as red or red classified as yellow (other wrong combos)
  if (corCorreta === 'amarelo' && corEscolhida === 'vermelho') {
    return 'Essa parte do corpo não é perigosa de ser tocada, mas se estiver desconfortável lembre-se de estabelecer seus limites. Você não está sozinho e seu corpo é seu!';
  }
  if (corCorreta === 'vermelho' && corEscolhida === 'amarelo') {
    return 'Cuidado! Essa área do seu corpo não deve ser tocada por qualquer um. Vamos tentar de novo?';
  }
  return 'Vamos tentar de novo?';
}

export default function SemaforoDoCorpoScreen({ navigation }) {
  const { atualizarProgresso } = useAuth();
  const [faseAtual, setFaseAtual] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [concluido, setConcluido] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const fase = FASES[faseAtual];

  const animarCard = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim]);

  const handleResposta = useCallback(
    (corEscolhida) => {
      animarCard();
      const correto = corEscolhida === fase.cor;

      if (correto) {
        setAcertou(true);
        setMensagem('Você acertou! Muito bem, continue assim!');
        atualizarProgresso('semaforoDoCorpo', fase.id);
      } else {
        setAcertou(false);
        setMensagem(getMensagemErro(fase.cor, corEscolhida));
      }
      setModalVisible(true);
    },
    [fase, animarCard, atualizarProgresso]
  );

  const handleFecharModal = useCallback(() => {
    setModalVisible(false);
    if (acertou) {
      if (faseAtual < FASES.length - 1) {
        setFaseAtual((prev) => prev + 1);
      } else {
        setConcluido(true);
      }
    }
  }, [acertou, faseAtual]);

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

  const progresso = ((faseAtual) / FASES.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.botaoVoltar2}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Semáforo do Corpo</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressoContainer}>
        <View style={styles.progressoBarra}>
          <View
            style={[styles.progressoPreenchido, { width: `${progresso}%` }]}
          />
        </View>
        <Text style={styles.progressoTexto}>
          {faseAtual + 1} de {FASES.length}
        </Text>
      </View>

      {/* Instruction */}
      <View style={styles.instrucaoContainer}>
        <Ionicons name="bulb-outline" size={20} color={COLORS.accent} />
        <Text style={styles.instrucaoTexto}>
          Qual a cor do semáforo para essa parte do corpo?
        </Text>
      </View>

      {/* Body Part Card */}
      <View style={styles.cardArea}>
        <Animated.View
          style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
        >
          <View style={styles.cardIconeContainer}>
            <Ionicons name={fase.icone} size={64} color={COLORS.primary} />
          </View>
          <Text style={styles.cardTexto}>{fase.parte}</Text>
        </Animated.View>
      </View>

      {/* Semáforo Legend */}
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

      {/* Buttons */}
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

      {/* Feedback Modal */}
      <FeedbackModal
        visible={modalVisible}
        acertou={acertou}
        mensagem={mensagem}
        onClose={handleFecharModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
  },
  botaoVoltar2: {
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
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  progressoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  progressoBarra: {
    width: '100%',
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressoPreenchido: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  progressoTexto: {
    fontSize: SIZES.sm,
    color: COLORS.textLight,
    marginTop: 6,
  },
  instrucaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  instrucaoTexto: {
    fontSize: SIZES.md,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  cardIconeContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTexto: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  legendaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 12,
  },
  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendaBola: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  legendaTexto: {
    fontSize: SIZES.sm,
    color: COLORS.textLight,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 8,
  },
  botaoCor: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  botaoCorTexto: {
    color: COLORS.textWhite,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
  concluidoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  concluidoIcone: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.accent + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  concluidoTitulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  concluidoTexto: {
    fontSize: SIZES.lg,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  botaoVoltar: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  botaoVoltarTexto: {
    color: COLORS.textWhite,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
});
