import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, sizes } from '../constants/colors';
import { strings } from '../constants/strings';

export default function FeedbackModal({ visible, acertou, mensagem, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, acertou ? styles.sucesso : styles.erro]}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={acertou ? 'happy-outline' : 'sad-outline'}
              size={60}
              color={acertou ? colors.success : colors.error}
            />
          </View>
          <Text style={styles.titulo}>{acertou ? strings.feedback.tituloAcerto : strings.feedback.tituloErro}</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: acertou ? colors.success : colors.warm }]}
            onPress={onClose}
          >
            <Text style={styles.botaoTexto}>{acertou ? strings.feedback.botaoContinuar : strings.feedback.botaoTentarNovamente}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
