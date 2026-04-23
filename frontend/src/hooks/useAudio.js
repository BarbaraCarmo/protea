import { useCallback, useEffect } from 'react';
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';

/**
 * Carrega e reproduz um asset de áudio local.
 * @param {number|null} audioSource - require('...mp3') ou null quando não há áudio para a fase
 * @param {boolean} autoPlay - reproduz automaticamente quando a fonte muda (padrão: false)
 */
export function useAudio(audioSource, autoPlay = false) {
  const player = useAudioPlayer(audioSource ?? null);
  const status = useAudioPlayerStatus(player);

  // Habilita áudio no modo silencioso do iOS (executado uma vez)
  useEffect(() => {
    setAudioModeAsync({ playsInSilentModeIOS: true }).catch(() => {});
  }, []);

  // Reproduz automaticamente quando a fonte muda (somente se autoPlay=true)
  useEffect(() => {
    if (!audioSource || !autoPlay) return;
    try {
      player.seekTo(0);
      player.play();
    } catch (_) {}
  }, [audioSource]); // eslint-disable-line react-hooks/exhaustive-deps

  const tocar = useCallback(() => {
    if (!audioSource) return;
    try {
      player.seekTo(0);
      player.play();
    } catch (_) {}
  }, [player, audioSource]);

  return { tocar, tocando: status.playing ?? false };
}
