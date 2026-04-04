import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { appStyles } from '../styles/App.styles';
import { imagemAvatar } from '../constants/imagemAssets';
import { JOGOS_CONFIG, COR_PRATA, COR_OURO, normalizarMedalhas } from '../constants/jogos';

const AVATARES = Object.entries(imagemAvatar).map(([id, imagem]) => ({ id, imagem }));

export default function PerfilScreen() {
  const { user, atualizarAvatar, logout } = useAuth();
  const avatarSalvo = user?.crianca?.avatar;
  const avatarInicial = AVATARES.find((a) => a.id === avatarSalvo) ? avatarSalvo : null;
  const [avatarSelecionado, setAvatarSelecionado] = useState(avatarInicial);
  const medalhas = normalizarMedalhas(user?.medalhas);

  function calcularIdade() {
    if (!user?.crianca?.dataNascimento) return '';
    const nasc = new Date(user.crianca.dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return `${idade} anos`;
  }

  async function selecionarAvatar(avatarId) {
    setAvatarSelecionado(avatarId);
    try {
      await atualizarAvatar(avatarId);
    } catch (e) {
      console.log('Erro ao salvar avatar');
    }
  }

  function handleLogout() {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  }

  const avatarAtual = AVATARES.find((a) => a.id === avatarSelecionado);

  return (
    <ScrollView style={appStyles.container} contentContainerStyle={appStyles.content}>
      {/* Avatar e info */}
      <View style={appStyles.perfilCard}>
        {avatarAtual ? (
          <Image source={avatarAtual.imagem} style={appStyles.avatarGrande} resizeMode="contain" />
        ) : (
          <View style={[appStyles.avatarGrande, { backgroundColor: COLORS.primary + '20', justifyContent: 'center', alignItems: 'center' }]}>
            <Ionicons name="happy-outline" size={60} color={COLORS.primary} />
          </View>
        )}
        <Text style={appStyles.nome}>{user?.crianca?.nome || 'Amiguinho'}</Text>
        <Text style={appStyles.idade}>{calcularIdade()}</Text>
      </View>

      {/* Escolher Avatar */}
      <Text style={appStyles.secaoTitulo}>Escolha seu avatar</Text>
      <View style={appStyles.grid2Col}>
        {AVATARES.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              appStyles.avatarItem,
              avatarSelecionado === avatar.id && { borderColor: COLORS.primary, borderWidth: 3 },
            ]}
            onPress={() => selecionarAvatar(avatar.id)}
          >
            <Image source={avatar.imagem} style={{ width: '85%', height: '85%' }} resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Medalhas */}
      <Text style={appStyles.secaoTitulo}>Medalhas conquistadas</Text>
      <View style={appStyles.grid2Col}>
        {JOGOS_CONFIG.map((jogo) => {
          const temPrata = medalhas.includes(jogo.medalha_prata);
          const temOuro  = medalhas.includes(jogo.medalha_ouro);

          return (
            <View key={jogo.id} style={[appStyles.medalhaJogoCard, { borderLeftColor: jogo.cor }]}>
              <Text style={appStyles.medalhaJogoTitulo}>{jogo.tituloMedalha}</Text>

              <View style={appStyles.medalhaSlots}>
                {[
                  { conquistada: temPrata, cor: COR_PRATA, icone: 'medal-outline' },
                  { conquistada: temOuro,  cor: COR_OURO,  icone: 'trophy' },
                ].map(({ conquistada, cor, icone }, i) => (
                  <View
                    key={i}
                    style={[
                      appStyles.medalhaCirculo,
                      {
                        backgroundColor: conquistada ? jogo.cor + '30' : COLORS.border + '60'
                      },
                    ]}
                  >
                    <Ionicons
                      name={conquistada ? icone : 'lock-closed'}
                      size={24}
                      color={conquistada ? cor : COLORS.textLightest}
                    />
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>

      {/* Botão Sair */}
      <TouchableOpacity style={appStyles.botaoSair} onPress={handleLogout}>
        <Text style={appStyles.botaoSairTexto}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}