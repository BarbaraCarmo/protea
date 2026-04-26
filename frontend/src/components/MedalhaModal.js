import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { corPrata, corOuro } from '../constants/jogos';
import { imagemMedalha } from '../constants/imagemAssets';
import { strings } from '../constants/strings';
import { medalhaModalStyles as styles } from '../styles/Components.styles';

export default function MedalhaModal({ visible, tipo, jogoId, jogoTitulo, onClose }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const starAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0);
      starAnim.setValue(0);
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 60,
          friction: 7,
        }),
        Animated.timing(starAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleAnim, starAnim]);

  const isPrata  = tipo === 'prata';
  const cor      = isPrata ? corPrata : corOuro;
  const titulo   = isPrata ? strings.medalha.tituloPrata : strings.medalha.tituloOuro;
  const imagemSrc = imagemMedalha[jogoId]?.[isPrata ? 'prata' : 'ouro'];
  const mensagem = isPrata
    ? strings.medalha.mensagemPrata(jogoTitulo)
    : strings.medalha.mensagemOuro(jogoTitulo);

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
          <Animated.View style={[styles.iconeContainer, { opacity: starAnim }]}>
            <Image source={imagemSrc} style={styles.medalhaImagem} resizeMode="contain" />
          </Animated.View>

          <Text style={[styles.titulo, { color: cor }]}>{titulo}</Text>
          <Text style={styles.jogoNome}>{jogoTitulo}</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>

          <TouchableOpacity
            style={[styles.botao, { backgroundColor: cor }]}
            onPress={onClose}
            activeOpacity={0.85}
          >
            <Text style={styles.botaoTexto}>
              {isPrata ? strings.medalha.botaoContinuar : strings.medalha.botaoVoltar}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}
