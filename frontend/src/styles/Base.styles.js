import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/colors';

// ─── Tokens de sombra ────────────────────────────────────────────────────────
// Exportados separadamente para uso inline (ex: spread em StyleSheet.create)
export const shadow = {
    sm: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    md: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    lg: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
    },
};

// ─── Styles base globais ─────────────────────────────────────────────────────
export const baseStyles = StyleSheet.create({

    // ── Layout ──────────────────────────────────────────────────────────────────
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    // ── Tipografia ───────────────────────────────────────────────────────────────
    tituloPagina: {
        fontSize: SIZES.title,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 6,
    },
    subtituloPagina: {
        fontSize: SIZES.md,
        color: COLORS.textLight,
        marginBottom: 24,
    },
    secaoTitulo: {
        fontSize: SIZES.xl,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 14,
    },
    textoErro: {
        color: COLORS.warmDark,
        fontSize: SIZES.md,
        marginTop: 8,
    },

    // ── Card genérico (surface + sombra + radius) ────────────────────────────────
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        padding: 18,
        marginBottom: 16,
        ...shadow.sm,
    },
    cardLg: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radiusLg,
        padding: 24,
        marginBottom: 20,
        ...shadow.md,
    },
    cardCentralizado: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radiusLg,
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
        ...shadow.sm,
    },

    // ── Ícone circular genérico ──────────────────────────────────────────────────
    // Uso: aplicar backgroundColor inline com a cor do contexto
    iconeCirculo: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
    },

    // ── Linha com ícone + texto (FAQ header, contato, etc.) ─────────────────────
    linhaIconeTexto: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // ── Botão primário (cor primary) ─────────────────────────────────────────────
    botaoPrimario: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadow.md,
    },
    botaoPrimarioTexto: {
        color: COLORS.textWhite,
        fontSize: SIZES.xl,
        fontWeight: 'bold',
    },

    // ── Botão primário com ícone (row) ───────────────────────────────────────────
    botaoPrimarioRow: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        ...shadow.md,
    },

    // ── Campo de input com ícone (Login) ─────────────────────────────────────────
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        paddingHorizontal: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    inputIcone: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        fontSize: SIZES.lg,
        color: COLORS.text,
    },

    // ── Campo de input simples (Cadastro) ────────────────────────────────────────
    inputSimples: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: SIZES.lg,
        color: COLORS.text,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    // ── Seção com label colorido (Cadastro) ──────────────────────────────────────
    secaoLabel: {
        fontSize: SIZES.lg,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginTop: 16,
        marginBottom: 10,
    },

    // ── Tag/badge genérico (arredondado, row) ────────────────────────────────────
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    tagTexto: {
        fontSize: SIZES.sm,
        fontWeight: 'bold',
    },

    // ── Barra de progresso ───────────────────────────────────────────────────────
    progressoBarra: {
        height: 10,
        backgroundColor: COLORS.border,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 6,
    },
    progressoPreenchido: {
        height: '100%',
        borderRadius: 5,
    },
    progressoTexto: {
        fontSize: SIZES.sm,
        fontWeight: 'bold',
        textAlign: 'right',
    },

    // ── Grid de itens (avatar, medalha) ─────────────────────────────────────────
    grid2Col: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    grid3Col: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
});