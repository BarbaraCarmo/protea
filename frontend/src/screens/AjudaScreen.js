import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { appStyles } from '../styles/App.styles';

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
    <ScrollView style={appStyles.container} contentContainerStyle={appStyles.content}>
      {/* Disque 100 - Destaque */}
      <TouchableOpacity style={appStyles.disque100Card} onPress={ligarDisque100}>
        <View style={appStyles.disque100Header}>
          <View style={appStyles.disque100Icone}>
            <Ionicons name="call-outline" size={32} color={COLORS.textWhite} />
          </View>
          <View style={appStyles.disque100Info}>
            <Text style={appStyles.disque100Titulo}>Disque 100</Text>
            <Text style={appStyles.disque100Subtitulo}>Canal de denúncia de violência</Text>
          </View>
        </View>
        <Text style={appStyles.disque100Texto}>
          Se você suspeita de alguma situação de risco para uma criança, ligue para o Disque 100.
          O serviço funciona 24 horas e a ligação é gratuita.
        </Text>
        <View style={appStyles.disque100Botao}>
          <Ionicons name="call" size={18} color={COLORS.textWhite} />
          <Text style={appStyles.disque100BotaoTexto}>Ligar para o Disque 100</Text>
        </View>
      </TouchableOpacity>

      {/* FAQ */}
      <Text style={appStyles.secaoTitulo}>Perguntas Frequentes</Text>
      {FAQ.map((item, index) => (
        <View key={index} style={appStyles.faqCard}>
          <View style={appStyles.faqHeader}>
            <Ionicons name="help-circle-outline" size={22} color={COLORS.primary} />
            <Text style={appStyles.faqPergunta}>{item.pergunta}</Text>
          </View>
          <Text style={appStyles.faqResposta}>{item.resposta}</Text>
        </View>
      ))}

      {/* Sobre o app */}
      <Text style={appStyles.secaoTitulo}>Sobre o App</Text>
      <View style={appStyles.sobreCard}>
        <View style={appStyles.sobreIcone}>
          <Image source={require('../../assets/icon.png')} style={appStyles.sobreIcone} />
        </View>
        <Text style={appStyles.sobreNome}>Protea</Text>
        <Text style={appStyles.sobreVersao}>Versão 1.0.0</Text>
        <Text style={appStyles.sobreDescricao}>
          Aplicativo educativo que utiliza jogos para ensinar crianças com Transtorno do Espectro
          Autista (TEA) sobre educação sexual, limites corporais e identificação de situações de risco.
        </Text>
      </View>

      {/* Contato */}
      <View style={appStyles.contatoCard}>
        <Ionicons name="mail-outline" size={22} color={COLORS.primary} />
        <Text style={appStyles.contatoTexto}>Contato: babi.carmo@outlook.com</Text>
      </View>
    </ScrollView>
  );
}