import { StyleSheet } from 'react-native';
import { colors, sizes } from '../constants/colors';
import { baseStyles, shadow } from './Base.styles';

// Exporta os styles das abas já mesclados com a base.
// HomeScreen, ProgressoScreen, PerfilScreen e AjudaScreen importam daqui.
export const appStyles = {
    ...baseStyles,
    ...StyleSheet.create({

        // Layout partilhado (ScrollView content)
        content: {
            padding: 20,
            paddingBottom: 40,
        },
        loader: {
            marginVertical: 24,
        },
        erroTexto: {
            color: colors.error,
            textAlign: 'center',
            marginBottom: 16,
            fontSize: sizes.md,
        },

        // ══════════════════════════════════════════════════════════════════════════
        // HOME
        // ══════════════════════════════════════════════════════════════════════════

        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
            marginTop: 10,
        },
        saudacao: {
            fontSize: sizes.xxl,
            fontWeight: 'bold',
            color: colors.text,
        },
        subtitulo: {
            fontSize: sizes.md,
            color: colors.textLight,
            marginTop: 4,
        },

        // ══════════════════════════════════════════════════════════════════════════
        // PROGRESSO
        // ══════════════════════════════════════════════════════════════════════════

        progressoCardHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 14,
        },
        progressoIconContainer: {
            width: 48,
            height: 48,
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
        },
        progressoCardInfo: {
            flex: 1,
        },
        progressoJogoTitulo: {
            fontSize: sizes.lg,
            fontWeight: 'bold',
            color: colors.text,
        },
        progressoJogoFases: {
            fontSize: sizes.sm,
            color: colors.textLight,
            marginTop: 2,
        },
        progressoMarcador50: {
            position: 'absolute',
            left: '50%',
            top: -3,
            width: 2,
            height: 16,
            backgroundColor: colors.border,
            borderRadius: 1,
        },
        progressoMedalhasRow: {
            flexDirection: 'row',
            gap: 8,
            marginTop: 10,
        },
        progressoMedalhaBadge: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 20,
            gap: 5,
        },
        progressoMedalhaTexto: {
            fontSize: sizes.xs,
            fontWeight: 'bold',
        },

        // ══════════════════════════════════════════════════════════════════════════
        // PERFIL
        // ══════════════════════════════════════════════════════════════════════════

        perfilCard: {
            backgroundColor: colors.surface,
            borderRadius: sizes.radiusLg,
            padding: 24,
            alignItems: 'center',
            marginBottom: 24,
            ...shadow.sm,
        },
        avatarGrande: {
            width: 100,
            height: 100,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 14,
            borderWidth: 3,
            borderColor: colors.primary,
        },
        nome: {
            fontSize: sizes.xxl,
            fontWeight: 'bold',
            color: colors.text,
        },
        idade: {
            fontSize: sizes.lg,
            color: colors.textLight,
            marginTop: 4,
        },
        // ── Medalha por jogo (grid 2×2) — container usa baseStyles.grid2Col ────────
        medalhaJogoCard: {
            width: '49%',
            backgroundColor: colors.surface,
            borderRadius: sizes.radiusLg,
            paddingVertical: 16,
            paddingHorizontal: 12,
            alignItems: 'center',
            marginBottom: 8,
            borderLeftWidth: 5,
            ...shadow.sm,
        },
        medalhaJogoTitulo: {
            fontSize: sizes.sm,
            fontWeight: 'bold',
            color: colors.text,
            textAlign: 'center',
            marginBottom: 14,
        },
        medalhaSlots: {
            flexDirection: 'row',
            gap: 12,
        },
        medalhaCirculo: {
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.18,
            shadowRadius: 4,
            elevation: 4,
        },
        avatarItem: {
            width: '23%',
            height: '23%',
            aspectRatio: 1,
            backgroundColor: colors.surface,
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
            borderWidth: 2,
            borderColor: colors.border,
        },
        botaoSair: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.warmDark,
            borderRadius: sizes.radius,
            paddingVertical: 16,
            ...shadow.md,
        },
        botaoSairTexto: {
            color: colors.textWhite,
            fontSize: sizes.xl,
            fontWeight: 'bold',
            marginLeft: 8,
        },

        // ══════════════════════════════════════════════════════════════════════════
        // AJUDA
        // ══════════════════════════════════════════════════════════════════════════

        // Disque 100
        disque100Card: {
            backgroundColor: colors.warmDark,
            borderRadius: sizes.radiusLg,
            padding: 20,
            marginBottom: 24,
        },
        disque100Header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
        },
        disque100Icone: {
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: 'rgba(255,255,255,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 14,
        },
        disque100Info: {
            flex: 1,
        },
        disque100Titulo: {
            fontSize: sizes.xxl,
            fontWeight: 'bold',
            color: colors.textWhite,
        },
        disque100Subtitulo: {
            fontSize: sizes.md,
            color: 'rgba(255,255,255,0.8)',
        },
        disque100Texto: {
            fontSize: sizes.md,
            color: colors.textWhite,
            lineHeight: 22,
            marginBottom: 16,
        },
        disque100Botao: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.25)',
            borderRadius: sizes.radius,
            paddingVertical: 14,
            gap: 8,
        },
        disque100BotaoTexto: {
            color: colors.textWhite,
            fontSize: sizes.lg,
            fontWeight: 'bold',
        },

        // FAQ
        faqCard: {
            backgroundColor: colors.surface,
            borderRadius: sizes.radius,
            padding: 16,
            marginBottom: 12,
        },
        faqHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        faqPergunta: {
            fontSize: sizes.lg,
            fontWeight: 'bold',
            color: colors.text,
            marginLeft: 10,
            flex: 1,
        },
        faqResposta: {
            fontSize: sizes.md,
            color: colors.textLight,
            lineHeight: 22,
            paddingLeft: 32,
        },

        // Sobre
        sobreCard: {
            backgroundColor: colors.surface,
            borderRadius: sizes.radiusLg,
            padding: 24,
            alignItems: 'center',
            marginBottom: 24,
            ...shadow.sm,
        },
        sobreNome: {
            fontSize: sizes.xxl,
            fontWeight: 'bold',
            color: colors.primary,
            marginBottom: 5,
        },
        sobreVersao: {
            fontSize: sizes.sm,
            color: colors.textLight,
            marginBottom: 12,
        },
        sobreDescricao: {
            fontSize: sizes.md,
            color: colors.text,
            textAlign: 'center',
            lineHeight: 22,
        },
        sobreIcone: {
            width: 50,
            height: 50,
            marginBottom: 5,
        },

        // Contato
        contatoCard: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            borderRadius: sizes.radius,
            paddingVertical: 16,
            marginBottom: 20,
        },
        contatoTexto: {
            fontSize: sizes.md,
            color: colors.text,
            marginLeft: 10,
        },
    }),
};