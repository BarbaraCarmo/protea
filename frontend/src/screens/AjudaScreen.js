import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';

const FAQ = [
  {
    pergunta: 'O que é o Protea?',
    resposta: 'O Protea é um aplicativo educativo que usa jogos para ensinar crianças com TEA sobre educação sexual de forma segura, acessível e lúdica.',
  },
  {
    pergunta: 'Para qual faixa etária é indicado?',
    resposta: 'O app é indicado para crianças entre 6 e 11 anos, especialmente crianças com Transtorno do Espectro Autista (TEA).',
  },
  {
    pergunta: 'Como funcionam os jogos?',
    resposta: 'Cada jogo apresenta situações do cotidiano. A criança interage classificando, escolhendo respostas ou identificando situações. O app dá feedback educativo a cada resposta.',
  },
  {
    pergunta: 'Os dados da criança são seguros?',
    resposta: 'Sim! Coletamos apenas nome e data de nascimento da criança. Todos os dados são protegidos e usados exclusivamente para o funcionamento do app.',
  },
  {
    pergunta: 'Como acompanho o progresso do meu filho?',
    resposta: 'Na tela de Progresso, você pode ver a porcentagem concluída de cada jogo e as medalhas conquistadas.',
  },
];

export default function AjudaScreen() {
  function ligarDisque100() {
    Alert.alert(
      'Disque 100',
      'O Disque 100 é o canal de denúncias de violações de direitos humanos, incluindo violência contra crianças.\n\nLigue gratuitamente: 100\n\nFunciona 24 horas, todos os dias.',
      [
        { text: 'Fechar', style: 'cancel' },
        { text: 'Ligar agora', onPress: () => Linking.openURL('tel:100') },
      ]
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Ajuda e Informações</Text>

      {/* Disque 100 - Destaque */}
      <TouchableOpacity style={styles.disque100Card} onPress={ligarDisque100}>
        <View style={styles.disque100Header}>
          <View style={styles.disque100Icon}>
            <Ionicons name="call-outline" size={32} color={COLORS.textWhite} />
          </View>
          <View style={styles.disque100Info}>
            <Text style={styles.disque100Titulo}>Disque 100</Text>
            <Text style={styles.disque100Subtitulo}>Canal de denúncia de violência</Text>
          </View>
        </View>
        <Text style={styles.disque100Texto}>
          Se você suspeita de alguma situação de risco para uma criança, ligue para o Disque 100.
          O serviço funciona 24 horas e a ligação é gratuita.
        </Text>
        <View style={styles.disque100Botao}>
          <Ionicons name="call" size={18} color={COLORS.textWhite} />
          <Text style={styles.disque100BotaoTexto}>Ligar para o Disque 100</Text>
        </View>
      </TouchableOpacity>

      {/* FAQ */}
      <Text style={styles.secaoTitulo}>Perguntas Frequentes</Text>
      {FAQ.map((item, index) => (
        <View key={index} style={styles.faqCard}>
          <View style={styles.faqHeader}>
            <Ionicons name="help-circle-outline" size={22} color={COLORS.primary} />
            <Text style={styles.faqPergunta}>{item.pergunta}</Text>
          </View>
          <Text style={styles.faqResposta}>{item.resposta}</Text>
        </View>
      ))}

      {/* Sobre o app */}
      <Text style={styles.secaoTitulo}>Sobre o App</Text>
      <View style={styles.sobreCard}>
        <View style={styles.sobreIcone}>
          <Ionicons name="shield-checkmark" size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.sobreNome}>Protea</Text>
        <Text style={styles.sobreVersao}>Versão 1.0.0</Text>
        <Text style={styles.sobreDescricao}>
          Aplicativo educativo que utiliza jogos para ensinar crianças com Transtorno do Espectro
          Autista (TEA) sobre educação sexual, limites corporais e identificação de situações de risco.
        </Text>
      </View>

      {/* Contato */}
      <View style={styles.contatoCard}>
        <Ionicons name="mail-outline" size={22} color={COLORS.primary} />
        <Text style={styles.contatoTexto}>Suporte: contato@protea.app</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: SIZES.title, fontWeight: 'bold', color: COLORS.text, marginBottom: 20 },
  secaoTitulo: {
    fontSize: SIZES.xl, fontWeight: 'bold', color: COLORS.text, marginBottom: 14, marginTop: 10,
  },
  // Disque 100
  disque100Card: {
    backgroundColor: COLORS.warmDark, borderRadius: SIZES.radiusLg,
    padding: 20, marginBottom: 24,
  },
  disque100Header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  disque100Icon: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  disque100Info: { flex: 1 },
  disque100Titulo: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.textWhite },
  disque100Subtitulo: { fontSize: SIZES.md, color: 'rgba(255,255,255,0.8)' },
  disque100Texto: {
    fontSize: SIZES.md, color: COLORS.textWhite, lineHeight: 22, marginBottom: 16,
  },
  disque100Botao: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: SIZES.radius,
    paddingVertical: 14,
  },
  disque100BotaoTexto: {
    color: COLORS.textWhite, fontSize: SIZES.lg, fontWeight: 'bold', marginLeft: 8,
  },
  // FAQ
  faqCard: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.radius,
    padding: 16, marginBottom: 12,
  },
  faqHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  faqPergunta: { fontSize: SIZES.lg, fontWeight: 'bold', color: COLORS.text, marginLeft: 10, flex: 1 },
  faqResposta: { fontSize: SIZES.md, color: COLORS.textLight, lineHeight: 22, paddingLeft: 32 },
  // Sobre
  sobreCard: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.radius,
    padding: 24, alignItems: 'center', marginBottom: 16,
  },
  sobreIcone: { marginBottom: 10 },
  sobreNome: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.primary },
  sobreVersao: { fontSize: SIZES.sm, color: COLORS.textLight, marginBottom: 12 },
  sobreDescricao: { fontSize: SIZES.md, color: COLORS.text, textAlign: 'center', lineHeight: 22 },
  // Contato
  contatoCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.surface, borderRadius: SIZES.radius,
    paddingVertical: 16, marginBottom: 20,
  },
  contatoTexto: { fontSize: SIZES.md, color: COLORS.text, marginLeft: 10 },
});
