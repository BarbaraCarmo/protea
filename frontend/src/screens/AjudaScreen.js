import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { appStyles } from '../styles/App.styles';
import { imagemApp } from '../constants/imagemAssets';

const FAQ = strings.ajuda.faq;

export default function AjudaScreen() {
  function ligarDisque100() {
    Alert.alert(
      strings.ajuda.disque100.alertaTitulo,
      strings.ajuda.disque100.alertaMensagem,
      [
        { text: strings.ajuda.disque100.alertaFechar, style: 'cancel' },
        { text: strings.ajuda.disque100.alertaLigar, onPress: () => Linking.openURL(strings.ajuda.disque100.numero) },
      ]
    );
  }

  return (
    <ScrollView style={appStyles.container} contentContainerStyle={appStyles.content}>
      <TouchableOpacity style={appStyles.disque100Card} onPress={ligarDisque100}>
        <View style={appStyles.disque100Header}>
          <View style={appStyles.disque100Icone}>
            <Ionicons name="call-outline" size={32} color={colors.textWhite} />
          </View>
          <View style={appStyles.disque100Info}>
            <Text style={appStyles.disque100Titulo}>{strings.ajuda.disque100.titulo}</Text>
            <Text style={appStyles.disque100Subtitulo}>{strings.ajuda.disque100.subtitulo}</Text>
          </View>
        </View>
        <Text style={appStyles.disque100Texto}>{strings.ajuda.disque100.descricao}</Text>
        <View style={appStyles.disque100Botao}>
          <Ionicons name="call" size={18} color={colors.textWhite} />
          <Text style={appStyles.disque100BotaoTexto}>{strings.ajuda.disque100.botao}</Text>
        </View>
      </TouchableOpacity>

      <Text style={appStyles.secaoTitulo}>{strings.ajuda.secaoFaq}</Text>
      {FAQ.map((item, index) => (
        <View key={index} style={appStyles.faqCard}>
          <View style={appStyles.faqHeader}>
            <Ionicons name="help-circle-outline" size={22} color={colors.primary} />
            <Text style={appStyles.faqPergunta}>{item.pergunta}</Text>
          </View>
          <Text style={appStyles.faqResposta}>{item.resposta}</Text>
        </View>
      ))}

      <Text style={appStyles.secaoTitulo}>{strings.ajuda.secaoSobre}</Text>
      <View style={appStyles.sobreCard}>
        <View style={appStyles.sobreIcone}>
          <Image source={imagemApp.logo} style={appStyles.sobreIcone} />
        </View>
        <Text style={appStyles.sobreNome}>{strings.app.nome}</Text>
        <Text style={appStyles.sobreVersao}>{strings.app.versao}</Text>
        <Text style={appStyles.sobreDescricao}>{strings.app.descricao}</Text>
      </View>

      <View style={appStyles.contatoCard}>
        <Ionicons name="mail-outline" size={22} color={colors.primary} />
        <Text style={appStyles.contatoTexto}>{strings.app.contato}</Text>
      </View>
    </ScrollView>
  );
}
