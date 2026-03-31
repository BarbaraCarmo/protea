import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Animated,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../constants/colors';

/**
 * Exibe uma imagem com ActivityIndicator enquanto carrega e
 * fade-in suave ao concluir. Renderiza nada se `source` for falsy.
 * O loading é reativado automaticamente sempre que `source` mudar.
 *
 * Props:
 *   source   — require(...) ou { uri: '...' }
 *   width    — largura da imagem (padrão 150)
 *   height   — altura da imagem (padrão 150)
 *   cor      — cor do indicador (padrão COLORS.primary)
 */
export default function CardImagem({ source, width = 150, height = 150, cor }) {
  const [carregando, setCarregando] = useState(true);
  const opacidade = useRef(new Animated.Value(0)).current;

  // Sempre que a imagem mudar (nova fase), reseta o estado de carregamento
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
          color={cor ?? COLORS.primary}
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
});
