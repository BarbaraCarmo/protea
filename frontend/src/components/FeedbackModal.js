import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { feedbackModalStyles as styles } from '../styles/Components.styles';

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
