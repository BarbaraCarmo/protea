import { StyleSheet } from 'react-native';
import { colors, sizes } from '../constants/colors';
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
            color: colors.primary,
        },
        subtitle: {
            fontSize: sizes.md,
            color: colors.textLight,
            marginTop: 6,
        },

        // ── Cadastro: títulos ────────────────────────────────────────────────────
        titulo: {
            fontSize: sizes.title,
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: 8,
            textAlign: 'center',
        },
        subtitulo: {
            fontSize: sizes.md,
            color: colors.textLight,
            marginBottom: 24,
            textAlign: 'center',
        },
        secao: {
            fontSize: sizes.lg,
            fontWeight: 'bold',
            color: colors.primary,
            marginTop: 16,
            marginBottom: 10,
        },

        // ── Botão principal (Login / Cadastro) ───────────────────────────────────
        botao: {
            backgroundColor: colors.primary,
            borderRadius: sizes.radius,
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
            fontSize: sizes.md,
            color: colors.textLight,
        },
        linkDestaque: {
            color: colors.primary,
            fontWeight: 'bold',
        },
    }),
};