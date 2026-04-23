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
import { imagemJogo } from '../../constants/imagemAssets';
import IntroJogo from '../../components/IntroJogo';
import { audioAdultos } from '../../constants/audioAssets';
import { adultosDeConfiancaScreenStyles as styles } from '../../styles/jogos/JogosTemas.styles';
import { useAuth } from '../../context/AuthContext';
import CardImagem from '../../components/CardImagem';
import FeedbackModal from '../../components/FeedbackModal';
import MedalhaModal from '../../components/MedalhaModal';
import BotaoAudio from '../../components/BotaoAudio';
import { useAudio } from '../../hooks/useAudio';
import { jogosService } from '../../services/api';

const jogoId = 'adultoDeConfianca';

export default function AdultosDeConfiancaScreen({ navigation, route }) {
  const jogoInfo = route.params?.jogo;
  const { atualizarProgresso, user } = useAuth();

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
  const [medalhaConquistada, setMedalhaConquistada] = useState(null);
  const [modoRepeticao, setModoRepeticao] = useState(false);
  const [mostrarIntro, setMostrarIntro] = useState(false);
  const novasMedalhasRef   = useRef([]);
  const progressoPromiseRef = useRef(null);

  useEffect(() => {
    jogosService
      .getAdultosConfianca()
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

  const { tocar, tocando } = useAudio(fase ? audioAdultos[fase.id] : null);

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

    if (correto && !modoRepeticao) {
      novasMedalhasRef.current = [];
      progressoPromiseRef.current = atualizarProgresso(jogoId, fase.id).then((resultado) => {
        novasMedalhasRef.current = resultado?.novasMedalhas || [];
      });
    }
  }

  function avancar() {
    setSelecionados([]);
    setRespondido(false);
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
    setSelecionados([]);
    setRespondido(false);
  }

  async function fecharModal() {
    setModalVisible(false);
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
    } else {
      setSelecionados([]);
      setRespondido(false);
    }
  }

  function fecharMedalhaModal() {
    setMedalhaConquistada(null);
    avancar();
  }

  function getOpcaoEstilo(index) {
    if (!respondido) {
      if (selecionados.includes(index)) {
        return { borderColor: colors.primary, borderWidth: 3, backgroundColor: colors.primary + '10' };
      }
      return {};
    }
    const opcao = fase.opcoes[index];
    if (opcao.correto) {
      return { borderColor: colors.success, borderWidth: 3, backgroundColor: colors.success + '10' };
    }
    if (selecionados.includes(index) && !opcao.correto) {
      return { borderColor: colors.error, borderWidth: 3, backgroundColor: colors.error + '10' };
    }
    return {};
  }

  function getOpcaoIcone(index) {
    const isMultipla = fase.tipo === 'selecao_multipla';

    if (!isMultipla) {
      const letra = String.fromCharCode(65 + index);
      return (
        <View style={styles.opcaoLetra}>
          <Text style={styles.opcaoLetraTexto}>{letra}</Text>
        </View>
      );
    }

    if (!respondido) {
      return selecionados.includes(index)
        ? <Ionicons name="checkbox" size={24} color={colors.primary} />
        : <Ionicons name="square-outline" size={24} color={colors.border} />;
    }
    const opcao = fase.opcoes[index];
    if (opcao.correto) {
      return <Ionicons name="checkbox" size={24} color={colors.success} />;
    }
    if (selecionados.includes(index)) {
      return <Ionicons name="checkbox-outline" size={24} color={colors.error} />;
    }
    return <Ionicons name="square-outline" size={24} color={colors.border} />;
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
          <Text style={styles.concluidoTexto}>{strings.jogos.adultos.conclusaoMensagem}</Text>
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
            <View
              style={[styles.progressoPreenchidoWarm, { width: `${progresso}%` }]}
            />
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
              source={imagemJogo.adultoDeConfianca}
              width="100%"
              height="100%"
            />
          </View>
        </View>

        <Text style={styles.situacaoDescricao}>{fase.pergunta}</Text>

        {fase.tipo === 'selecao_multipla' && (
          <View style={styles.multiplaTag}>
            <Ionicons name="layers-outline" size={16} color={colors.primary} />
            <Text style={styles.multiplaTagTexto}>{strings.jogos.adultos.tagMultipla}</Text>
          </View>
        )}

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

        {fase.tipo === 'selecao_multipla' && !respondido && selecionados.length > 0 && (
          <TouchableOpacity
            style={[styles.jogoBotaoPrimario, styles.confirmarBotao]}
            onPress={() => verificarResposta()}
            activeOpacity={0.7}
          >
            <Ionicons name="checkmark-done-outline" size={22} color={colors.textWhite} />
            <Text style={styles.botaoConclusaoTexto}>{strings.jogos.adultos.botaoConfirmar}</Text>
          </TouchableOpacity>
        )}

        <View style={[styles.dicaContainer, styles.dicaPrimaria]}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.warm} />
          <Text style={styles.dicaTexto}>{strings.jogos.adultos.dica}</Text>
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
        jogoTitulo={strings.nav.jogos.adultoDeConfianca}
        onClose={fecharMedalhaModal}
      />
    </SafeAreaView>
  );
}
