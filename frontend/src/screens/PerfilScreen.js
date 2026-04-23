import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { appStyles } from '../styles/App.styles';
import { imagemAvatar } from '../constants/imagemAssets';
import { jogosUI, corPrata, corOuro, normalizarMedalhas } from '../constants/jogos';
import { strings } from '../constants/strings';

const AVATARES = Object.entries(imagemAvatar).map(([id, imagem]) => ({ id, imagem }));

export default function PerfilScreen() {
  const { user, catalogo, atualizarAvatar, logout } = useAuth();
  const avatarSalvo = user?.crianca?.avatar;
  const avatarInicial = AVATARES.find((a) => a.id === avatarSalvo) ? avatarSalvo : null;
  const [avatarSelecionado, setAvatarSelecionado] = useState(avatarInicial);
  const medalhas = normalizarMedalhas(user?.medalhas, catalogo);

  function calcularIdade() {
    if (!user?.crianca?.dataNascimento) return '';
    const nasc = new Date(user.crianca.dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return strings.perfil.idadeLabel(idade);
  }

  async function selecionarAvatar(avatarId) {
    setAvatarSelecionado(avatarId);
    try {
      await atualizarAvatar(avatarId);
    } catch {
      console.log('Erro ao salvar avatar');
    }
  }

  function handleLogout() {
    Alert.alert(strings.perfil.alertaSairTitulo, strings.perfil.alertaSairMensagem, [
      { text: strings.perfil.alertaSairCancelar, style: 'cancel' },
      { text: strings.perfil.alertaSairConfirmar, style: 'destructive', onPress: logout },
    ]);
  }

  const avatarAtual = AVATARES.find((a) => a.id === avatarSelecionado);

  return (
    <ScrollView style={appStyles.container} contentContainerStyle={appStyles.content}>
      <View style={appStyles.perfilCard}>
        {avatarAtual ? (
          <Image source={avatarAtual.imagem} style={appStyles.avatarGrande} resizeMode="contain" />
        ) : (
          <View style={[appStyles.avatarGrande, { backgroundColor: colors.primary + '20', justifyContent: 'center', alignItems: 'center' }]}>
            <Ionicons name="happy-outline" size={60} color={colors.primary} />
          </View>
        )}
        <Text style={appStyles.nome}>{user?.crianca?.nome || strings.perfil.nomePadrao}</Text>
        <Text style={appStyles.idade}>{calcularIdade()}</Text>
      </View>

      <Text style={appStyles.secaoTitulo}>{strings.perfil.escolherAvatar}</Text>
      <View style={appStyles.grid2Col}>
        {AVATARES.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              appStyles.avatarItem,
              avatarSelecionado === avatar.id && { borderColor: colors.primary, borderWidth: 3 },
            ]}
            onPress={() => selecionarAvatar(avatar.id)}
          >
            <Image source={avatar.imagem} style={{ width: '85%', height: '85%' }} resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={appStyles.secaoTitulo}>{strings.perfil.medalhas}</Text>
      <View style={appStyles.grid2Col}>
        {catalogo.map((jogo) => {
          const ui     = jogosUI[jogo.id] || {};
          const temPrata = medalhas.includes(jogo.medalhaPrata);
          const temOuro  = medalhas.includes(jogo.medalhaOuro);

          return (
            <View key={jogo.id} style={[appStyles.medalhaJogoCard, { borderLeftColor: jogo.cor }]}>
              <Text style={appStyles.medalhaJogoTitulo}>{ui.tituloMedalha}</Text>

              <View style={appStyles.medalhaSlots}>
                {[
                  { conquistada: temPrata, cor: corPrata, icone: 'medal-outline' },
                  { conquistada: temOuro,  cor: corOuro,  icone: 'trophy-outline' },
                ].map(({ conquistada, cor, icone }, i) => (
                  <View
                    key={i}
                    style={[
                      appStyles.medalhaCirculo,
                      {
                        backgroundColor: conquistada ? jogo.cor + '30' : colors.border + '60'
                      },
                    ]}
                  >
                    <Ionicons
                      name={conquistada ? icone : 'lock-closed'}
                      size={24}
                      color={conquistada ? cor : colors.textLightest}
                    />
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={appStyles.botaoSair} onPress={handleLogout}>
        <Text style={appStyles.botaoSairTexto}>{strings.perfil.botaoSair}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
