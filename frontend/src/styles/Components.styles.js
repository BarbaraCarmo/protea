import { StyleSheet } from 'react-native';
import { colors, sizes } from '../constants/colors';
import { shadow } from './Base.styles';

// ─── BotaoAudio ───────────────────────────────────────────────────────────────
export const botaoAudioStyles = StyleSheet.create({
  botao: {
    padding: 6,
    marginLeft: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
});

// ─── CardImagem ───────────────────────────────────────────────────────────────
export const cardImagemStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
});

// ─── FeedbackModal ────────────────────────────────────────────────────────────
export const feedbackModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radiusLg,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  sucesso: { borderTopWidth: 4, borderTopColor: colors.success },
  erro: { borderTopWidth: 4, borderTopColor: colors.error },
  iconContainer: { marginBottom: 15 },
  titulo: {
    fontSize: sizes.xxl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  mensagem: {
    fontSize: sizes.lg,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: sizes.radius,
  },
  botaoTexto: {
    color: colors.textWhite,
    fontSize: sizes.lg,
    fontWeight: 'bold',
  },
});

// ─── GameCard ─────────────────────────────────────────────────────────────────
export const gameCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 5,
    ...shadow.sm,
  },
  header: { flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1, marginRight: 12 },
  titulo: {
    fontSize: sizes.xl,
    fontWeight: 'bold',
    color: colors.text,
    flexShrink: 1,
    marginBottom: 6,
  },
  descricao: { fontSize: sizes.md, color: colors.textLight, lineHeight: 20 },
  imagemJogo: {
    width: 88,
    height: 88,
  },
});

// ─── IntroJogo ────────────────────────────────────────────────────────────────
export const introJogoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  audioBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30,
    gap: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  descricao: {
    fontSize: sizes.lg,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 26,
  },
  botao: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: sizes.radius,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
    ...shadow.md,
  },
  botaoTexto: {
    color: colors.textWhite,
    fontSize: sizes.lg,
    fontWeight: 'bold',
  },
});

// ─── MedalhaModal ─────────────────────────────────────────────────────────────
export const medalhaModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
  },
  iconeContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  medalhaImagem: {
    width: 120,
    height: 120,
  },
  titulo: {
    fontSize: sizes.xxl,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  jogoNome: {
    fontSize: sizes.md,
    color: colors.textLight,
    marginBottom: 12,
    textAlign: 'center',
  },
  mensagem: {
    fontSize: sizes.md,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 24,
    marginBottom: 24,
  },
  botao: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
  },
  botaoTexto: {
    color: colors.textWhite,
    fontSize: sizes.lg,
    fontWeight: 'bold',
  },
});
