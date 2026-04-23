import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { gameCardStyles as styles } from '../styles/Components.styles';

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
