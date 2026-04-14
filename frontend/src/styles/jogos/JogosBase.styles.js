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
      paddingVertical: 10,
      alignItems: 'center',
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

    // Área da imagem dentro do card — definir dimensões via width/height inline
    // ou com aspectRatio. Garante espaço visual mesmo antes da imagem chegar.
    cardImagemArea: {
      width: '100%',
      minHeight: 200,
      alignItems: 'center',
      justifyContent: 'center',
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
      textAlign: 'center',
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
      textAlign: 'center',
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

    // ── Rodapé: linha de botões (semáforo, toque bom/ruim, etc.) ─────────────
    botoesRodape: {
      flexDirection: 'row',
      gap: 12,
      paddingHorizontal: 20,
      paddingBottom: 30,
      paddingTop: 8,
    },

    // ── Botão primário do jogo ────────────────────────────────────────────────
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
    jogoBotaoPrimarioTexto: {
      color: colors.textWhite,
      fontSize: sizes.lg,
      fontWeight: 'bold',
    },
    // @deprecated — use jogoBotaoPrimario
    botaoAcao: {
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
    botaoAcaoTexto: {
      color: colors.textWhite,
      fontSize: sizes.lg,
      fontWeight: 'bold',
    },

    // ── Tela de conclusão / erro ─────────────────────────────────────────────
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
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    concluidoIconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
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
      gap: 10,
      ...shadow.md,
    },
    botaoConclusaoTexto: {
      color: colors.textWhite,
      fontSize: sizes.lg,
      fontWeight: 'bold',
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
