import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, sizes } from '../constants/colors';
import { corPrata, corOuro } from '../constants/jogos';

export default function MedalhaModal({ visible, tipo, jogoTitulo, onClose }) {
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

  const isPrata = tipo === 'prata';
  const cor     = isPrata ? corPrata : corOuro;
  const titulo  = isPrata ? 'Medalha de Prata!' : 'Medalha de Ouro!';
  const icone   = isPrata ? 'medal-outline' : 'trophy';
  const mensagem = isPrata
    ? `Você chegou na metade de "${jogoTitulo}"!\nContinue assim e conquiste o ouro!`
    : `Incrível! Você completou "${jogoTitulo}" e conquistou a medalha de ouro!`;

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
          <Animated.View
            style={[
              styles.iconeContainer,
              { backgroundColor: cor + '20', opacity: starAnim },
            ]}
          >
            <Ionicons name={icone} size={72} color={cor} />
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
              {isPrata ? 'Continuar jogando!' : 'Voltar ao início!'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    color: '#fff',
    fontSize: sizes.lg,
    fontWeight: 'bold',
  },
});
