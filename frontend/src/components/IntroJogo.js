import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { imagemCard } from '../constants/imagemAssets';
import { audioIntro } from '../constants/audioAssets';
import { introJogoStyles as styles } from '../styles/Components.styles';
import CardImagem from './CardImagem';
import BotaoAudio from './BotaoAudio';
import { useAudio } from '../hooks/useAudio';

/**
 * Tela de introdução exibida na primeira vez que a criança abre um jogo.
 *
 * Props:
 *  - jogoInfo  : objeto do catálogo (id, titulo, intro, imagemKey, cor)
 *  - onComecar : callback chamado ao pressionar "Começar"
 */
export default function IntroJogo({ jogoInfo, onComecar }) {
  const cor = jogoInfo?.cor || colors.primary;
  const { tocar, tocando } = useAudio(
    jogoInfo?.id ? audioIntro[jogoInfo.id] : null
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.audioBar}>
        <BotaoAudio onPress={tocar} tocando={tocando} />
      </View>

      <View style={styles.content}>

        <CardImagem
          source={imagemCard[jogoInfo?.imagemKey]}
          width={300}
          height={300}
        />

        <Text style={styles.descricao}>{jogoInfo?.intro ?? jogoInfo?.descricao}</Text>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: cor }]}
          onPress={onComecar}
          activeOpacity={0.8}
        >
          <Ionicons name="play-outline" size={22} color={colors.textWhite} />
          <Text style={styles.botaoTexto}>{strings.jogos.botaoComecar}</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
