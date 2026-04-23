/**
 * Variações por jogo — só contém o que é exclusivo de cada tema.
 * Tudo compartilhado (card, imagem, textos, opções, conclusão) está em JogosBase.
 */
import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../constants/colors';
import { jogosBaseStyles, shadow } from './JogosBase.styles';

// ─── O Poder do Não ───────────────────────────────────────────────────────────
export const poderDoNaoScreenStyles = {
  ...jogosBaseStyles,
  ...StyleSheet.create({
    opcaoSelecionada: {
      elevation: 4,
      shadowOpacity: 0.15,
    },
    opcaoLetra: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.accent + '25',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
    },
    opcaoLetraTexto: {
      fontSize: sizes.md,
      fontWeight: 'bold',
      color: colors.accent,
    },
    botaoPrimario: {
      backgroundColor: colors.accent,
    },
    dicaPrimaria: {
      backgroundColor: colors.accent + '15',
    },
  }),
};

// ─── Adultos de Confiança ─────────────────────────────────────────────────────
export const adultosDeConfiancaScreenStyles = {
  ...jogosBaseStyles,
  ...StyleSheet.create({
    progressoPreenchidoWarm: {
      height: '100%',
      backgroundColor: colors.warm,
      borderRadius: 6,
    },
    opcaoLetra: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.warm + '25',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
    },
    opcaoLetraTexto: {
      fontSize: sizes.md,
      fontWeight: 'bold',
      color: colors.warm,
    },
    opcaoCheckbox: {
      marginRight: 14,
    },
    // Espaçamento do botão "Confirmar Resposta" — compõe com jogoBotaoPrimario
    confirmarBotao: {
      marginTop: 4,
      marginBottom: 12,
    },
    botaoPrimario: {
      backgroundColor: colors.warm,
    },
    dicaPrimaria: {
      backgroundColor: colors.warm + '15',
    },
  }),
};

// ─── Semáforo do Corpo ────────────────────────────────────────────────────────
export const semaforoDoCorpoScreenStyles = {
  ...jogosBaseStyles,
  ...StyleSheet.create({
    // 3 botões coloridos no rodapé
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
      borderRadius: sizes.radius,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      ...shadow.md,
    },
    botaoCorTexto: {
      color: colors.textWhite,
      fontSize: sizes.md,
      fontWeight: 'bold',
    },
    // Legenda verde / amarelo / vermelho
    legendaContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
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
      fontSize: sizes.sm,
      color: colors.textLight,
    },
    // Cor de destaque dos botões de conclusão neste jogo
    botaoPrimario: {
      backgroundColor: colors.primary,
    },
  }),
};

// ─── Toque Bom vs Toque Ruim ──────────────────────────────────────────────────
export const toqueBomVsRuimScreenStyles = {
  ...jogosBaseStyles,
  ...StyleSheet.create({
    // 2 botões "Toque Bom" / "Toque Ruim"
    botoesContainer: {
      flexDirection: 'row',
      gap: 12,
      paddingHorizontal: 20,
      paddingBottom: 30,
      paddingTop: 8,
    },
    botaoResposta: {
      flex: 1,
      paddingVertical: 22,
      borderRadius: sizes.radius,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      ...shadow.md,
    },
    botaoBom: {
      backgroundColor: colors.toqueBom,
    },
    botaoRuim: {
      backgroundColor: colors.toqueRuim,
    },
    botaoRespostaTexto: {
      color: colors.textWhite,
      fontSize: sizes.md,
      fontWeight: 'bold',
    },
    // Cor de destaque dos botões de conclusão neste jogo
    botaoPrimario: {
      backgroundColor: colors.primary,
    },
  }),
};
