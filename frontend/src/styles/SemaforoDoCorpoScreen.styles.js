import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/colors';
import { jogosBaseStyles } from './JogosBase.styles';

export const semaforoDoCorpoScreenStyles = {
  ...jogosBaseStyles,
  ...StyleSheet.create({
    botoesContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
      paddingHorizontal: 20,
      paddingBottom: 30,
      paddingTop: 8,
    },
    botaoCor: {
      flex: 1,
      paddingVertical: 18,
      borderRadius: SIZES.radius,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    botaoCorTexto: {
      color: COLORS.textWhite,
      fontSize: SIZES.md,
      fontWeight: 'bold',
    },
    legendaContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      paddingVertical: 12,
    },
    legendaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    legendaBola: {
      width: 14,
      height: 14,
      borderRadius: 7,
    },
    legendaTexto: {
      fontSize: SIZES.sm,
      color: COLORS.textLight,
    },
  }),
};