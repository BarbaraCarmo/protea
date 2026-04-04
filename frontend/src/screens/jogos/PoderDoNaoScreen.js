import React, { useState, useEffect, useRef } from 'react';
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
import { imagemPorChave } from '../../constants/imagemAssets';
import { poderDoNaoScreenStyles as styles } from '../../styles/jogos/JogosTemas.styles';
import { useAuth } from '../../context/AuthContext';
import CardImagem from '../../components/CardImagem';
import FeedbackModal from '../../components/FeedbackModal';
import MedalhaModal from '../../components/MedalhaModal';
import { jogosService } from '../../services/api';

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
  const [medalhaConquistada, setMedalhaConquistada] = useState(null);
  const novasMedalhasRef = useRef([]);

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
      novasMedalhasRef.current = [];
      atualizarProgresso('poderDoNao', fase.id).then((resultado) => {
        novasMedalhasRef.current = resultado?.novasMedalhas || [];
      });
    }
  }

  function avancar() {
    if (faseAtual < totalFases - 1) {
      setFaseAtual(faseAtual + 1);
    } else {
      setConcluido(true);
    }
  }

  function fecharModal() {
    setModalVisible(false);
    setOpcaoSelecionada(null);

    if (acertou) {
      const prata = novasMedalhasRef.current.includes('poderDoNao_prata');
      const ouro  = novasMedalhasRef.current.includes('poderDoNao_ouro');
      if (prata || ouro) {
        novasMedalhasRef.current = [];
        setMedalhaConquistada(prata ? 'prata' : 'ouro');
        return;
      }
      avancar();
    }
  }

  function fecharMedalhaModal() {
    setMedalhaConquistada(null);
    avancar();
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
            style={[styles.botaoConclusao, { backgroundColor: COLORS.accent }]}
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
            style={[styles.concluidoIconContainer, { backgroundColor: COLORS.accent + '20' }]}
          >
            <Ionicons name="trophy-outline" size={80} color={COLORS.accent} />
          </View>
          <Text style={styles.concluidoTitulo}>Parabéns!</Text>
          <Text style={styles.concluidoTexto}>
            Você completou todas as fases do Poder do Não! Agora você sabe como
            dizer NÃO de forma firme e respeitosa.
          </Text>
          <TouchableOpacity
            style={[styles.botaoConclusao, { backgroundColor: COLORS.accent }]}
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
            <View style={[styles.progressoPreenchido, { width: `${progresso}%` }]} />
          </View>
          <View style={styles.progressoInfo}>
            <Text style={styles.progressoTexto}>
              Fase {faseAtual + 1} de {totalFases}
            </Text>
          </View>
        </View>

        {/* Card com imagem ilustrativa */}
        <View style={styles.card}>
          <View style={styles.cardImagemArea}>
            <CardImagem
              source={imagemPorChave[fase.ilustracao]}
              width={150}
              height={150}
              cor={COLORS.accent}
            />
          </View>
        </View>

        {/* Situação — abaixo do card */}
        <Text style={styles.situacaoDescricao}>{fase.situacao}</Text>

        {/* Instrução secundária */}
        <Text style={styles.instrucaoSecundaria}>
          Como você responderia? Escolha a melhor opção:
        </Text>

        {/* Opções */}
        {fase.opcoes.map((opcao, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.opcaoBotao,
              opcaoSelecionada === index && styles.opcaoSelecionada,
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
            </View>
          </TouchableOpacity>
        ))}

        {/* Dica */}
        <View style={[styles.dicaContainer, { backgroundColor: COLORS.accent + '15' }]}>
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
      <MedalhaModal
        visible={medalhaConquistada !== null}
        tipo={medalhaConquistada}
        jogoTitulo="O Poder do Não"
        onClose={fecharMedalhaModal}
      />
    </SafeAreaView>
  );
}
