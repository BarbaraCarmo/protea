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
import { colors } from '../../constants/colors';
import { strings } from '../../constants/strings';
import { imagemPorChave } from '../../constants/imagemAssets';
import IntroJogo from '../../components/IntroJogo';
import { audioPoder } from '../../constants/audioAssets';
import { poderDoNaoScreenStyles as styles } from '../../styles/jogos/JogosTemas.styles';
import { useAuth } from '../../context/AuthContext';
import CardImagem from '../../components/CardImagem';
import FeedbackModal from '../../components/FeedbackModal';
import MedalhaModal from '../../components/MedalhaModal';
import BotaoAudio from '../../components/BotaoAudio';
import { useAudio } from '../../hooks/useAudio';
import { jogosService } from '../../services/api';

const jogoId = 'poderDoNao';

export default function PoderDoNaoScreen({ navigation, route }) {
  const jogoInfo = route.params?.jogo;
  const { atualizarProgresso, user } = useAuth();

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
  const [modoRepeticao, setModoRepeticao] = useState(false);
  const [mostrarIntro, setMostrarIntro] = useState(false);
  const novasMedalhasRef   = useRef([]);
  const progressoPromiseRef = useRef(null);

  useEffect(() => {
    jogosService
      .getPoderDoNao()
      .then((res) => setFases(res.data.fases))
      .catch(() => setErro(strings.jogos.erroCarregar))
      .finally(() => setCarregando(false));
  }, []);

  // Retoma da primeira fase ainda não concluída; mostra intro se for a primeira vez
  useEffect(() => {
    if (fases.length === 0) return;
    const concluidos = user?.progresso?.[jogoId]?.concluidos || [];
    if (concluidos.length === 0) {
      setMostrarIntro(true);
      return;
    }
    const primeiraFasePendente = fases.findIndex(f => !concluidos.includes(f.id));
    if (primeiraFasePendente === -1) {
      setConcluido(true);
    } else {
      setFaseAtual(primeiraFasePendente);
    }
  }, [fases]); // eslint-disable-line react-hooks/exhaustive-deps

  const fase = fases[faseAtual];
  const totalFases = fases.length;
  const progresso = totalFases > 0 ? (faseAtual / totalFases) * 100 : 0;

  const { tocar, tocando } = useAudio(fase ? audioPoder[fase.id] : null);

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

    if (correto && !modoRepeticao) {
      novasMedalhasRef.current = [];
      progressoPromiseRef.current = atualizarProgresso(jogoId, fase.id).then((resultado) => {
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

  function reiniciarJogo() {
    setFaseAtual(0);
    setConcluido(false);
    setModoRepeticao(true);
    setModalVisible(false);
    setMedalhaConquistada(null);
    setOpcaoSelecionada(null);
  }

  async function fecharModal() {
    setModalVisible(false);
    setOpcaoSelecionada(null);

    if (acertou) {
      if (progressoPromiseRef.current) {
        await progressoPromiseRef.current;
        progressoPromiseRef.current = null;
      }
      const prata = novasMedalhasRef.current.includes(`${jogoId}_prata`);
      const ouro  = novasMedalhasRef.current.includes(`${jogoId}_ouro`);
      const isUltimaFase = faseAtual >= totalFases - 1;
      if ((prata || ouro) && !isUltimaFase && !modoRepeticao) {
        novasMedalhasRef.current = [];
        setMedalhaConquistada(prata ? 'prata' : 'ouro');
        return;
      }
      novasMedalhasRef.current = [];
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
        <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (erro) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.concluidoContainer}>
          <Ionicons name="cloud-offline-outline" size={64} color={colors.textLight} />
          <Text style={styles.concluidoTexto}>{erro}</Text>
          <TouchableOpacity
            style={[styles.botaoConclusao, styles.botaoPrimario]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={colors.textWhite} />
            <Text style={styles.botaoConclusaoTexto}>{strings.jogos.botaoVoltar}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (mostrarIntro) {
    return <IntroJogo jogoInfo={jogoInfo} onComecar={() => setMostrarIntro(false)} />;
  }

  if (concluido) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.concluidoContainer}>
          <View style={styles.concluidoIcone}>
            <Ionicons name="trophy-outline" size={80} color={colors.accent} />
          </View>
          <Text style={styles.concluidoTitulo}>{strings.jogos.conclusaoTitulo}</Text>
          <Text style={styles.concluidoTexto}>{strings.jogos.poderDoNao.conclusaoMensagem}</Text>
          <TouchableOpacity
            style={[styles.botaoConclusao, styles.botaoRepetir]}
            onPress={reiniciarJogo}
          >
            <Ionicons name="refresh-outline" size={20} color={colors.textWhite} />
            <Text style={styles.botaoConclusaoTexto}>{strings.jogos.botaoJogarNovamente}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botaoConclusao, styles.botaoPrimario]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="home-outline" size={20} color={colors.textWhite} />
            <Text style={styles.botaoConclusaoTexto}>{strings.jogos.botaoVoltarInicio}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: 0 }]}>
        <View style={styles.progressoContainerJogos}>
          <View style={styles.progressoBarra}>
            <View style={[styles.progressoPreenchido, { width: `${progresso}%` }]} />
          </View>
          <View style={styles.progressoInfo}>
            <Text style={styles.progressoTexto}>
              {strings.jogos.faseLabel(faseAtual + 1, totalFases)}
            </Text>
          </View>
        </View>

        <View style={styles.botaoAudioContainer}>
          <BotaoAudio onPress={tocar} tocando={tocando} />
        </View>

        <View style={styles.card}>
          <View style={styles.cardImagemArea}>
            <CardImagem
              source={imagemPorChave[fase.ilustracao]}
              width="100%"
              height="100%"
            />
          </View>
        </View>

        <Text style={styles.situacaoDescricao}>{fase.situacao}</Text>

        <Text style={styles.instrucaoSecundaria}>{strings.jogos.poderDoNao.instrucao}</Text>

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
              <View style={styles.opcaoLetra}>
                <Text style={styles.opcaoLetraTexto}>{String.fromCharCode(65 + index)}</Text>
              </View>
              <Text style={styles.opcaoTexto}>{opcao.texto}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={[styles.dicaContainer, styles.dicaPrimaria]}>
          <Ionicons name="bulb-outline" size={20} color={colors.accent} />
          <Text style={styles.dicaTexto}>{strings.jogos.poderDoNao.dica}</Text>
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
        jogoTitulo={strings.nav.jogos.poderDoNao}
        onClose={fecharMedalhaModal}
      />
    </SafeAreaView>
  );
}
