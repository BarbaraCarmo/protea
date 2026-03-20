import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';

export default function FeedbackModal({ visible, acertou, mensagem, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, acertou ? styles.sucesso : styles.erro]}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={acertou ? 'happy-outline' : 'sad-outline'}
              size={60}
              color={acertou ? COLORS.success : COLORS.error}
            />
          </View>
          <Text style={styles.titulo}>{acertou ? 'Muito bem!' : 'Ops!'}</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: acertou ? COLORS.success : COLORS.warm }]}
            onPress={onClose}
          >
            <Text style={styles.botaoTexto}>{acertou ? 'Continuar' : 'Tentar de novo'}</Text>
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
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
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
  sucesso: { borderTopWidth: 4, borderTopColor: COLORS.success },
  erro: { borderTopWidth: 4, borderTopColor: COLORS.error },
  iconContainer: { marginBottom: 15 },
  titulo: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  mensagem: {
    fontSize: SIZES.lg,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: SIZES.radius,
  },
  botaoTexto: {
    color: COLORS.textWhite,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
});
