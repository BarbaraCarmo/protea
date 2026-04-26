import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../constants/colors';
import { baseStyles, shadow } from '../Base.styles';

export { shadow };

export const jogosBaseStyles = {
  ...baseStyles,
  ...StyleSheet.create({
    // ── Scroll das telas de jogo ───────────────────────────────────────────────
    content: {
      padding: 20,
      paddingBottom: 32,
    },

    // ── Barra de progresso (jogos) ─────────────────────────────────────────────
    progressoContainerJogos: {
      paddingHorizontal: 20,
      paddingTop: 4,
      paddingBottom: 6,
      alignItems: 'center',
    },
    botaoAudioContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 4,
    },
    progressoBarra: {
      width: '100%',
      height: 12,
      backgroundColor: colors.border,
      borderRadius: 6,
      overflow: 'hidden',
    },
    progressoPreenchido: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 6,
    },
    progressoInfo: {
      width: '100%',
      alignItems: 'center',
    },
    progressoTexto: {
      fontSize: sizes.sm,
      color: colors.textLight,
      marginTop: 6,
    },

    // ── Área que centraliza o card (telas sem scroll) ──────────────────────────
    cardArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },

    // ── Card base com sombra ───────────────────────────────────────────────────
    // Pode conter imagem e texto. Sem ícones — todas as fases usam imagens ilustrativas.
    card: {
      backgroundColor: colors.surface,
      borderRadius: sizes.radiusLg,
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 16,
      alignItems: 'center',
      width: '100%',
      ...shadow.lg,
    },

    // Área da imagem dentro do card — ocupa toda a largura do card.
    // aspectRatio = largura/altura: 1 = quadrado, > 1 = mais baixo.
    // Padding de 5 em todas as direções entre a borda e a imagem.
    cardImagemArea: {
      width: '100%',
      aspectRatio: 1.5,
      padding: 5,
      marginBottom: 8,
    },

    // Label opcional dentro do card (ex: nome da parte do corpo no Semáforo)
    cardLabel: {
      fontSize: sizes.xl,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
      marginTop: 4,
    },

    // ── Texto de situação / pergunta — fica ABAIXO do card ────────────────────
    situacaoDescricao: {
      fontSize: sizes.lg,
      color: colors.text,
      textAlign: 'left',
      lineHeight: 30,
      fontWeight: '300',
      marginTop: 16,
      marginBottom: 16,
      paddingHorizontal: 4,
    },

    // Instrução secundária — abaixo da descrição (ex: "Escolha a melhor opção:")
    instrucaoSecundaria: {
      fontSize: sizes.lg,
      color: colors.textLight,
      textAlign: 'left',
      fontWeight: '500',
      marginBottom: 16,
    },

    // ── Tag "Selecione todas as corretas" (ou variações) ──────────────────────
    // Fica logo abaixo do texto de situação, antes das opções.
    multiplaTag: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: colors.primary + '15',
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: sizes.radiusSm,
      marginBottom: 16,
      gap: 6,
    },
    multiplaTagTexto: {
      fontSize: sizes.sm,
      color: colors.primary,
      fontWeight: '600',
    },

    // ── Botão primário do jogo (sem stretch) ─────────────────────────────────
    // Para botões de ação no meio do conteúdo (ex: confirmar resposta).
    // Para botões de conclusão full-width use botaoConclusao.
    jogoBotaoPrimario: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: sizes.radius,
      gap: 10,
      ...shadow.md,
    },

    // ── Tela de conclusão / erro ─────────────────────────────────────────────
    concluidoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
    },
    concluidoMedalhaImagem: {
      width: 160,
      height: 160,
      marginBottom: 24,
    },
    concluidoTitulo: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    concluidoTexto: {
      fontSize: sizes.lg,
      color: colors.textLight,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 32,
    },
    botaoConclusao: {
      flexDirection: 'row',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: sizes.radius,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      gap: 10,
      ...shadow.md,
    },
    botaoConclusaoTexto: {
      color: colors.textWhite,
      fontSize: sizes.lg,
      fontWeight: 'bold',
    },
    botaoRepetir: {
      backgroundColor: colors.textLight,
      marginVertical: 12,
    },

    // ── Opções de resposta ───────────────────────────────────────────────────
    opcaoBotao: {
      backgroundColor: colors.surface,
      borderRadius: sizes.radius,
      padding: 18,
      marginBottom: 12,
      borderWidth: 2,
      borderColor: colors.border,
      ...shadow.sm,
    },
    opcaoConteudo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    opcaoTexto: {
      fontSize: sizes.lg,
      color: colors.text,
      flex: 1,
      lineHeight: 24,
    },

    // ── Dica no rodapé ────────────────────────────────────────────────────────
    dicaContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: sizes.radius,
      padding: 14,
      marginTop: 8,
    },
    dicaTexto: {
      fontSize: sizes.md,
      color: colors.text,
      marginLeft: 10,
      flex: 1,
      lineHeight: 20,
    },
  }),
};
