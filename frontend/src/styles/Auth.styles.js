import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/colors';
import { baseStyles, shadow } from './Base.styles';

// Exporta os styles de Auth já mesclados com a base.
// LoginScreen e CadastroScreen importam daqui diretamente.
export const authStyles = {
    ...baseStyles,
    ...StyleSheet.create({

        // ── Scroll (Login = centralizado; Cadastro = padding contínuo) ────────────
        scrollCentralizado: {
            flexGrow: 1,
            justifyContent: 'center',
            padding: 24,
        },
        scrollPadrao: {
            padding: 24,
            paddingBottom: 40,
        },

        // ── Botão de voltar (Cadastro) ───────────────────────────────────────────
        voltar: {
            marginBottom: 10,
        },

        // ── Logo / identidade visual (Login) ─────────────────────────────────────
        logoContainer: {
            alignItems: 'center',
            marginBottom: 40,
        },
        logoIcone: {
            width: 50,
            height: 50,
            marginBottom: 5,
        },
        appName: {
            fontSize: 36,
            fontWeight: 'bold',
            color: COLORS.primary,
        },
        subtitle: {
            fontSize: SIZES.md,
            color: COLORS.textLight,
            marginTop: 6,
        },

        // ── Cadastro: títulos ────────────────────────────────────────────────────
        titulo: {
            fontSize: SIZES.title,
            fontWeight: 'bold',
            color: COLORS.text,
            marginBottom: 8,
            textAlign: 'center',
        },
        subtitulo: {
            fontSize: SIZES.md,
            color: COLORS.textLight,
            marginBottom: 24,
            textAlign: 'center',
        },
        secao: {
            fontSize: SIZES.lg,
            fontWeight: 'bold',
            color: COLORS.primary,
            marginTop: 16,
            marginBottom: 10,
        },

        // ── Botão principal (Login / Cadastro) ───────────────────────────────────
        botao: {
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.radius,
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'center',
            ...shadow.md,
        },

        // ── Formulário ────────────────────────────────────────────────────────────
        form: {
            width: '100%',
        },

        // ── Link de navegação (Login → Cadastro) ─────────────────────────────────
        link: {
            alignItems: 'center',
            marginTop: 20,
        },
        linkTexto: {
            fontSize: SIZES.md,
            color: COLORS.textLight,
        },
        linkDestaque: {
            color: COLORS.primary,
            fontWeight: 'bold',
        },
    }),
};