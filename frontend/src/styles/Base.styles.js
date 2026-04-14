import { StyleSheet } from 'react-native';
import { colors, sizes } from '../constants/colors';

// ─── Tokens de sombra ────────────────────────────────────────────────────────
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
        backgroundColor: colors.background,
    },

    // ── Tipografia ───────────────────────────────────────────────────────────────
    secaoTitulo: {
        fontSize: sizes.xl,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 14,
    },

    // ── Card genérico (surface + sombra + radius) ────────────────────────────────
    card: {
        backgroundColor: colors.surface,
        borderRadius: sizes.radius,
        padding: 18,
        marginBottom: 16,
        ...shadow.sm,
    },

    // ── Botão primário texto ─────────────────────────────────────────────────────
    botaoPrimarioTexto: {
        color: colors.textWhite,
        fontSize: sizes.xl,
        fontWeight: 'bold',
    },

    // ── Campos de input ──────────────────────────────────────────────────────────
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: sizes.radius,
        paddingHorizontal: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: colors.border,
    },
    inputIcone: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        fontSize: sizes.lg,
        color: colors.text,
    },
    inputSimples: {
        backgroundColor: colors.surface,
        borderRadius: sizes.radius,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: sizes.lg,
        color: colors.text,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },

    // ── Barra de progresso ───────────────────────────────────────────────────────
    progressoBarra: {
        height: 10,
        backgroundColor: colors.border,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 6,
    },
    progressoPreenchido: {
        height: '100%',
        borderRadius: 5,
    },
    progressoTexto: {
        fontSize: sizes.sm,
        fontWeight: 'bold',
        textAlign: 'right',
    },

    // ── Grid de 2 colunas (avatar, medalha) ─────────────────────────────────────
    grid2Col: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
});
