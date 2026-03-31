import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/colors';
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
            color: COLORS.error,
            textAlign: 'center',
            marginBottom: 16,
            fontSize: SIZES.md,
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
            fontSize: SIZES.xxl,
            fontWeight: 'bold',
            color: COLORS.text,
        },
        subtitulo: {
            fontSize: SIZES.md,
            color: COLORS.textLight,
            marginTop: 4,
        },

        // ══════════════════════════════════════════════════════════════════════════
        // PROGRESSO
        // ══════════════════════════════════════════════════════════════════════════

        progressoSubtitulo: {
            fontSize: SIZES.lg,
            color: COLORS.textLight,
            marginTop: 24,
            marginBottom: 32,
        },
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
            fontSize: SIZES.lg,
            fontWeight: 'bold',
            color: COLORS.text,
        },
        progressoJogoFases: {
            fontSize: SIZES.sm,
            color: COLORS.textLight,
            marginTop: 2,
        },
        progressoMedalhaTag: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            marginTop: 10,
            gap: 6,
        },
        progressoMedalhaTexto: {
            fontSize: SIZES.sm,
            fontWeight: 'bold',
            marginLeft: 6,
        },

        // ══════════════════════════════════════════════════════════════════════════
        // PERFIL
        // ══════════════════════════════════════════════════════════════════════════

        perfilCard: {
            backgroundColor: COLORS.surface,
            borderRadius: SIZES.radiusLg,
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
        },
        nome: {
            fontSize: SIZES.xxl,
            fontWeight: 'bold',
            color: COLORS.text,
        },
        idade: {
            fontSize: SIZES.lg,
            color: COLORS.textLight,
            marginTop: 4,
        },
        avatarGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 24,
        },
        medalhasContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 24,
        },
        avatarItem: {
            width: '30%',
            aspectRatio: 1,
            backgroundColor: COLORS.surface,
            borderRadius: SIZES.radius,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
            borderWidth: 2,
            borderColor: COLORS.border,
        },
        medalhaItem: {
            width: '48%',
            backgroundColor: COLORS.surface,
            borderRadius: SIZES.radius,
            padding: 16,
            alignItems: 'center',
            marginBottom: 12,
        },
        medalhaInativa: {
            opacity: 0.5,
        },
        medalhaIcone: {
            width: 56,
            height: 56,
            borderRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
        },
        medalhaNome: {
            fontSize: SIZES.sm,
            fontWeight: 'bold',
            color: COLORS.text,
            textAlign: 'center',
        },
        botaoSair: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.surface,
            borderRadius: SIZES.radius,
            paddingVertical: 16,
            borderWidth: 2,
            borderColor: COLORS.error,
            ...shadow.sm,
        },
        botaoSairTexto: {
            color: COLORS.error,
            fontSize: SIZES.lg,
            fontWeight: 'bold',
            marginLeft: 8,
        },

        // ══════════════════════════════════════════════════════════════════════════
        // AJUDA
        // ══════════════════════════════════════════════════════════════════════════

        // Disque 100
        disque100Card: {
            backgroundColor: COLORS.warmDark,
            borderRadius: SIZES.radiusLg,
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
            fontSize: SIZES.xxl,
            fontWeight: 'bold',
            color: COLORS.textWhite,
        },
        disque100Subtitulo: {
            fontSize: SIZES.md,
            color: 'rgba(255,255,255,0.8)',
        },
        disque100Texto: {
            fontSize: SIZES.md,
            color: COLORS.textWhite,
            lineHeight: 22,
            marginBottom: 16,
        },
        disque100Botao: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.25)',
            borderRadius: SIZES.radius,
            paddingVertical: 14,
            gap: 8,
        },
        disque100BotaoTexto: {
            color: COLORS.textWhite,
            fontSize: SIZES.lg,
            fontWeight: 'bold',
        },

        // FAQ
        faqCard: {
            backgroundColor: COLORS.surface,
            borderRadius: SIZES.radius,
            padding: 16,
            marginBottom: 12,
        },
        faqHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        faqPergunta: {
            fontSize: SIZES.lg,
            fontWeight: 'bold',
            color: COLORS.text,
            marginLeft: 10,
            flex: 1,
        },
        faqResposta: {
            fontSize: SIZES.md,
            color: COLORS.textLight,
            lineHeight: 22,
            paddingLeft: 32,
        },

        // Sobre
        sobreCard: {
            backgroundColor: COLORS.surface,
            borderRadius: SIZES.radiusLg,
            padding: 24,
            alignItems: 'center',
            marginBottom: 24,
            ...shadow.sm,
        },
        sobreNome: {
            fontSize: SIZES.xxl,
            fontWeight: 'bold',
            color: COLORS.primary,
            marginBottom: 5,
        },
        sobreVersao: {
            fontSize: SIZES.sm,
            color: COLORS.textLight,
            marginBottom: 12,
        },
        sobreDescricao: {
            fontSize: SIZES.md,
            color: COLORS.text,
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
            backgroundColor: COLORS.surface,
            borderRadius: SIZES.radius,
            paddingVertical: 16,
            marginBottom: 20,
        },
        contatoTexto: {
            fontSize: SIZES.md,
            color: COLORS.text,
            marginLeft: 10,
        },
    }),
};