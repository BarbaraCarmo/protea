import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/colors';
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
      backgroundColor: COLORS.border,
      borderRadius: 6,
      overflow: 'hidden',
    },
    progressoPreenchido: {
      height: '100%',
      backgroundColor: COLORS.primary,
      borderRadius: 6,
    },
    progressoInfo: {
      width: '100%',
      alignItems: 'center',
    },
    progressoTexto: {
      fontSize: SIZES.sm,
      color: COLORS.textLight,
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
      backgroundColor: COLORS.surface,
      borderRadius: SIZES.radiusLg,
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
      minHeight: 150,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },

    // Label opcional dentro do card (ex: nome da parte do corpo no Semáforo)
    cardLabel: {
      fontSize: SIZES.xl,
      fontWeight: '600',
      color: COLORS.text,
      textAlign: 'center',
      marginTop: 4,
    },

    // ── Texto de situação / pergunta — fica ABAIXO do card ────────────────────
    situacaoDescricao: {
      fontSize: SIZES.xl,
      color: COLORS.text,
      textAlign: 'center',
      lineHeight: 30,
      fontWeight: '300',
      marginTop: 16,
      marginBottom: 8,
      paddingHorizontal: 4,
    },

    // Instrução secundária — abaixo da descrição (ex: "Escolha a melhor opção:")
    instrucaoSecundaria: {
      fontSize: SIZES.lg,
      color: COLORS.textLight,
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
      backgroundColor: COLORS.primary + '15',
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: SIZES.radiusSm,
      marginBottom: 16,
      gap: 6,
    },
    multiplaTagTexto: {
      fontSize: SIZES.sm,
      color: COLORS.primary,
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
      backgroundColor: COLORS.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: SIZES.radius,
      gap: 10,
      ...shadow.md,
    },
    jogoBotaoPrimarioTexto: {
      color: COLORS.textWhite,
      fontSize: SIZES.lg,
      fontWeight: 'bold',
    },
    // @deprecated — use jogoBotaoPrimario
    botaoAcao: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: SIZES.radius,
      gap: 10,
      ...shadow.md,
    },
    botaoAcaoTexto: {
      color: COLORS.textWhite,
      fontSize: SIZES.lg,
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
      backgroundColor: COLORS.primary + '20',
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
    botaoConclusao: {
      flexDirection: 'row',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: SIZES.radius,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      ...shadow.md,
    },
    botaoConclusaoTexto: {
      color: COLORS.textWhite,
      fontSize: SIZES.lg,
      fontWeight: 'bold',
    },

    // ── Opções de resposta ───────────────────────────────────────────────────
    opcaoBotao: {
      backgroundColor: COLORS.surface,
      borderRadius: SIZES.radius,
      padding: 18,
      marginBottom: 12,
      borderWidth: 2,
      borderColor: COLORS.border,
      ...shadow.sm,
    },
    opcaoConteudo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    opcaoTexto: {
      fontSize: SIZES.lg,
      color: COLORS.text,
      flex: 1,
      lineHeight: 24,
    },

    // ── Dica no rodapé ────────────────────────────────────────────────────────
    dicaContainer: {
      flexDirection: 'row',
      alignItems: 'center',
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
  }),
};
