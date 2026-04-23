import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { botaoAudioStyles as styles } from '../styles/Components.styles';

/**
 * Botão de alto-falante que reproduz o áudio da pergunta atual.
 * Aparece ao lado do texto da questão.
 *
 * Props:
 *  - onPress: função que dispara a reprodução
 *  - tocando: boolean — ícone muda enquanto o áudio está tocando
 *  - size: tamanho do ícone (padrão 40)
 */
export default function BotaoAudio({ onPress, tocando = false, size = 40 }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.botao}
      activeOpacity={0.7}
      accessibilityLabel="Ouvir pergunta"
      accessibilityRole="button"
    >
      <Ionicons
        name={tocando ? 'volume-high' : 'volume-medium-outline'}
        size={size}
        color={tocando ? colors.primary : colors.textLight}
      />
    </TouchableOpacity>
  );
}
