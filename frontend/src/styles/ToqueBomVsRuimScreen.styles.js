import { StyleSheet } from 'react-native';
import { jogosBaseStyles } from './JogosBase.styles';
import { COLORS, SIZES } from '../constants/colors';

export const toqueBomVsRuimScreenStyles = {
    ...jogosBaseStyles,
    ...StyleSheet.create({
        botoesContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 16,
            paddingHorizontal: 20,
            paddingBottom: 34,
            paddingTop: 12,
        },
        botaoResposta: {
            flex: 1,
            paddingVertical: 22,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.18,
            shadowRadius: 4,
        },
        botaoBom: {
            backgroundColor: COLORS.toqueBom,
        },
        botaoRuim: {
            backgroundColor: COLORS.toqueRuim,
        },
        botaoRespostaTexto: {
            color: COLORS.textWhite,
            fontSize: SIZES.md,
            fontWeight: 'bold',
        }
    })
};