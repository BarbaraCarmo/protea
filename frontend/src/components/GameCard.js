import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES } from '../constants/colors';

export default function GameCard({ titulo, descricao, imagem, cor, onPress }) {
  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: cor }]} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.descricao} numberOfLines={2}>{descricao}</Text>
        </View>
        {imagem ? (
          <Image source={imagem} style={styles.imagemJogo} resizeMode="contain" />
        ) : null}
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
  header: { flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1, marginRight: 12 },
  titulo: { fontSize: SIZES.xl, fontWeight: 'bold', color: COLORS.text, flexShrink: 1, marginBottom: 6 },
  descricao: { fontSize: SIZES.md, color: COLORS.textLight, lineHeight: 20 },
  imagemJogo: {
    width: 88,
    height: 88,
  },
});
