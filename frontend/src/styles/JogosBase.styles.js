import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/colors';

export const jogosBaseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6
  },
  botaoVoltar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  headerTitulo: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text
  },
  progressoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center'
  },
  progressoBarra: {
    width: '100%',
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: 6,
    overflow: 'hidden'
  },
  progressoPreenchido: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 6
  },
  progressoTexto: {
    fontSize: SIZES.sm,
    color: COLORS.textLight,
    marginTop: 6
  },
  instrucaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8
  },
  instrucaoTexto: {
    fontSize: SIZES.md,
    color: COLORS.textLight,
    textAlign: 'center'
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.12,
    shadowRadius: 6
  },
  cardIconeContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  cardTexto: {
    fontSize: SIZES.lg,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500'
  },
  concluidoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  concluidoIcone: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  concluidoTitulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12
  },
  concluidoTexto: {
    fontSize: SIZES.lg,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32
  },
  botaoAcao: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 4
  },
  botaoAcaoTexto: {
    color: COLORS.textWhite,
    fontSize: SIZES.lg,
    fontWeight: 'bold'
  },
});