import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Animated,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { colors } from '../constants/colors';
import { cardImagemStyles as styles } from '../styles/Components.styles';

/**
 * Exibe uma imagem com ActivityIndicator enquanto carrega e
 * fade-in suave ao concluir. Renderiza nada se `source` for falsy.
 * O loading é reativado automaticamente sempre que `source` mudar.
 *
 * Props:
 *   source  — require(...) ou { uri: '...' }
 *   width   — largura (padrão 150, aceita número ou '100%')
 *   height  — altura  (padrão 150, aceita número ou '100%')
 */
export default function CardImagem({ source, width = 150, height = 150 }) {
  const [carregando, setCarregando] = useState(true);
  const opacidade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!source) return;
    opacidade.stopAnimation();
    opacidade.setValue(0);
    setCarregando(true);
  }, [source]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!source) return null;

  function handleLoad() {
    setCarregando(false);
    Animated.timing(opacidade, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={[styles.container, { width, height }]}>
      {carregando && (
        <ActivityIndicator
          style={StyleSheet.absoluteFill}
          color={colors.primary}
          size="large"
        />
      )}
      <Animated.Image
        source={source}
        style={[styles.imagem, { opacity: opacidade }]}
        resizeMode="contain"
        onLoad={handleLoad}
        onError={handleLoad}
      />
    </View>
  );
}
