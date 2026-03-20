import React, { useState, useCallback, useRef } from 'react';
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
  {
    id: 1,
    situacao: 'A vovó te dá um abraço carinhoso quando você chega na casa dela.',
    tipo: 'bom',
    icone: 'heart-outline',
    feedbackCorreto: 'Isso mesmo! O abraço da vovó é um toque bom, cheio de carinho e amor!',
    feedbackErrado: 'Na verdade, o abraço da vovó é um toque bom! Abraços carinhosos de pessoas da família que te amam são seguros.',
  },
  {
    id: 2,
    situacao: 'A mamãe te dá um beijo na testa antes de dormir.',
    tipo: 'bom',
    icone: 'moon-outline',
    feedbackCorreto: 'Muito bem! O beijo da mamãe na testa é um toque seguro e cheio de amor!',
    feedbackErrado: 'O beijo da mamãe na testa é um toque bom! É uma forma carinhosa de dizer boa noite.',
  },
  {
    id: 3,
    situacao: 'Seu amiguinho segura sua mão para atravessar a rua juntos.',
    tipo: 'bom',
    icone: 'people-outline',
    feedbackCorreto: 'Acertou! Dar as mãos para se proteger é um toque bom e seguro!',
    feedbackErrado: 'Dar as mãos para atravessar a rua é um toque bom! É uma forma de se cuidar junto.',
  },
  {
    id: 4,
    situacao: 'Sua mãe faz cafuné na sua cabeça enquanto você assiste TV.',
    tipo: 'bom',
    icone: 'hand-left-outline',
    feedbackCorreto: 'Isso! O cafuné da mamãe é um toque bom, que traz conforto e carinho!',
    feedbackErrado: 'O cafuné é um toque bom! É uma forma carinhosa de demonstrar amor.',
  },
  {
    id: 5,
    situacao: 'O médico examina sua garganta com a mamãe do lado.',
    tipo: 'bom',
    icone: 'medkit-outline',
    feedbackCorreto: 'Muito bem! Quando o médico examina você com um responsável junto, é um toque seguro para cuidar da sua saúde!',
    feedbackErrado: 'O exame do médico com a mamãe do lado é um toque bom! Ele está cuidando da sua saúde e seu responsável está junto.',
  },
  {
    id: 6,
    situacao: 'Sua mãe te ajuda a se vestir quando você pede ajuda.',
    tipo: 'bom',
    icone: 'shirt-outline',
    feedbackCorreto: 'Isso! Quando VOCÊ pede ajuda para se vestir, é um toque seguro e de confiança!',
    feedbackErrado: 'Quando você pede ajuda para se vestir à sua mãe, é um toque bom! Ela está te ajudando porque você pediu.',
  },
  {
    id: 7,
    situacao: 'Alguém da escola cuida do seu joelho machucado.',
    tipo: 'bom',
    icone: 'bandage-outline',
    feedbackCorreto: 'Acertou! Cuidar de um machucado é um toque bom, feito para te ajudar!',
    feedbackErrado: 'Cuidar do seu joelho machucado é um toque bom! A pessoa está te ajudando a ficar melhor.',
  },
  {
    id: 8,
    situacao: 'Alguém toca você e pede para guardar segredo, dizendo que ninguém pode saber.',
    tipo: 'ruim',
    icone: 'alert-circle-outline',
    feedbackCorreto: 'Muito bem! Se alguém pede para guardar segredo sobre um toque, é um toque ruim! Sempre conte para um adulto de confiança.',
    feedbackErrado: 'Cuidado! Quando alguém pede para você guardar segredo sobre um toque, é um toque ruim. Nunca guarde esse tipo de segredo - conte para um adulto de confiança!',
  },
  {
    id: 9,
    situacao: 'Um adulto oferece um presente em troca de deixar ele te tocar.',
    tipo: 'ruim',
    icone: 'alert-circle-outline',
    feedbackCorreto: 'Isso mesmo! Ninguém deve oferecer presentes em troca de toques. Isso é um toque ruim! Conte para alguém de confiança.',
    feedbackErrado: 'Atenção! Quando alguém oferece presente em troca de toques, é um toque ruim! Nenhum presente vale mais que sua segurança. Conte para um adulto de confiança!',
  },
  {
    id: 10,
    situacao: 'Alguém entra no banheiro sem pedir sua permissão enquanto você está lá.',
    tipo: 'ruim',
    icone: 'alert-circle-outline',
    feedbackCorreto: 'Muito bem! Sua privacidade é importante. Ninguém deve invadir o banheiro sem sua permissão!',
    feedbackErrado: 'Cuidado! Ninguém deve entrar no banheiro sem sua permissão. Isso não é seguro! Você tem direito à sua privacidade.',
  },
  {
    id: 11,
    situacao: 'Um adulto quer te dar um beijo na boca mesmo quando você não quer.',
    tipo: 'ruim',
    icone: 'alert-circle-outline',
    feedbackCorreto: 'Acertou! Se você não quer, ninguém pode te forçar! Seu corpo é seu e você pode dizer NÃO!',
    feedbackErrado: 'Atenção! Se você não quer um beijo, ninguém pode te forçar. Isso é um toque ruim! Lembre-se: seu corpo é seu e você pode dizer NÃO!',
  },
];

export default function ToqueBomVsRuimScreen({ navigation }) {
  const { atualizarProgresso } = useAuth();
  const [faseAtual, setFaseAtual] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [concluido, setConcluido] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const fase = FASES[faseAtual];

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
      const correto = tipoEscolhido === fase.tipo;

      if (correto) {
        setAcertou(true);
        setMensagem(fase.feedbackCorreto);
        atualizarProgresso('toqueBomVsRuim', fase.id);
      } else {
        setAcertou(false);
        setMensagem(fase.feedbackErrado);
      }
      setModalVisible(true);
    },
    [fase, atualizarProgresso]
  );

  const handleFecharModal = useCallback(() => {
    setModalVisible(false);
    if (acertou) {
      if (faseAtual < FASES.length - 1) {
        setFaseAtual((prev) => prev + 1);
        animarEntrada();
      } else {
        setConcluido(true);
      }
    }
  }, [acertou, faseAtual, animarEntrada]);

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

  const progresso = (faseAtual / FASES.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.botaoVoltar}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Toque Bom vs Ruim</Text>
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
          Esse toque é bom ou ruim?
        </Text>
      </View>

      {/* Situation Card */}
      <View style={styles.cardArea}>
        <Animated.View
          style={[
            styles.card,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View
            style={[
              styles.cardIconeContainer,
              {
                backgroundColor:
                  fase.tipo === 'bom'
                    ? COLORS.toqueBom + '20'
                    : COLORS.toqueRuim + '20',
              },
            ]}
          >
            <Ionicons
              name={fase.icone}
              size={56}
              color={fase.tipo === 'bom' ? COLORS.toqueBom : COLORS.toqueRuim}
            />
          </View>
          <Text style={styles.cardTexto}>{fase.situacao}</Text>
        </Animated.View>
      </View>

      {/* Buttons */}
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
  botaoVoltar: {
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
    padding: 28,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  cardIconeContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTexto: {
    fontSize: SIZES.xl,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '500',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 20,
    paddingBottom: 34,
    paddingTop: 12,
  },
  botaoResposta: {
    flex: 1,
    paddingVertical: 22,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  botaoBom: {
    backgroundColor: COLORS.toqueBom,
  },
  botaoRuim: {
    backgroundColor: COLORS.toqueRuim,
  },
  botaoRespostaTexto: {
    color: COLORS.textWhite,
    fontSize: SIZES.lg,
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
    backgroundColor: COLORS.primary + '20',
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
  botaoVoltarInicio: {
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
