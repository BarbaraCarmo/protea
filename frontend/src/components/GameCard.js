import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';

export default function GameCard({ titulo, descricao, icone, cor, progresso, onPress }) {
  const porcentagem = progresso || 0;

  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: cor }]} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: cor + '20' }]}>
          <Ionicons name={icone} size={32} color={cor} />
        </View>
        <View style={styles.info}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.descricao} numberOfLines={2}>{descricao}</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${porcentagem}%`, backgroundColor: cor }]} />
        </View>
        <Text style={[styles.progressText, { color: cor }]}>{porcentagem}%</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  info: { flex: 1 },
  titulo: { fontSize: SIZES.xl, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  descricao: { fontSize: SIZES.md, color: COLORS.textLight, lineHeight: 20 },
  progressContainer: { flexDirection: 'row', alignItems: 'center' },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 4 },
  progressText: { fontSize: SIZES.sm, fontWeight: 'bold', minWidth: 35 },
});
