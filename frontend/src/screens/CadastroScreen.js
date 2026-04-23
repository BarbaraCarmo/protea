import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { useAuth } from '../context/AuthContext';
import { authStyles } from '../styles/Auth.styles';
export default function CadastroScreen({ navigation }) {
  const { cadastrar } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nomeResponsavel: '',
    email: '',
    telefone: '',
    grauParentesco: '',
    senha: '',
    confirmarSenha: '',
    nomeCrianca: '',
    dataNascimento: '',
  });

  function updateForm(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function formatarData(text) {
    const limpo = text.replace(/\D/g, '');
    if (limpo.length <= 2) return limpo;
    if (limpo.length <= 4) return `${limpo.slice(0, 2)}/${limpo.slice(2)}`;
    return `${limpo.slice(0, 2)}/${limpo.slice(2, 4)}/${limpo.slice(4, 8)}`;
  }

  async function handleCadastro() {
    const { nomeResponsavel, email, telefone, grauParentesco, senha, confirmarSenha, nomeCrianca, dataNascimento } = form;

    if (!nomeResponsavel || !email || !telefone || !grauParentesco || !senha || !nomeCrianca || !dataNascimento) {
      Alert.alert(strings.auth.alertas.tituloAtencao, strings.auth.alertas.camposObrigatorios);
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert(strings.auth.alertas.tituloAtencao, strings.auth.alertas.senhasDiferentes);
      return;
    }
    if (senha.length < 6) {
      Alert.alert(strings.auth.alertas.tituloAtencao, strings.auth.alertas.senhaCurta);
      return;
    }

    // Converter data DD/MM/AAAA para Date
    const partes = dataNascimento.split('/');
    if (partes.length !== 3) {
      Alert.alert(strings.auth.alertas.tituloAtencao, strings.auth.alertas.dataInvalida);
      return;
    }
    const dataISO = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);

    setLoading(true);
    try {
      await cadastrar({
        responsavel: {
          nome: nomeResponsavel.trim(),
          email: email.trim().toLowerCase(),
          telefone: telefone.trim(),
          grauParentesco: grauParentesco.trim(),
        },
        senha,
        crianca: {
          nome: nomeCrianca.trim(),
          dataNascimento: dataISO.toISOString(),
        },
      });
    } catch (error) {
      const msg = error.response?.data?.mensagem || strings.auth.alertas.erroCadastro;
      Alert.alert(strings.auth.alertas.tituloErro, msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={authStyles.container}>
    <KeyboardAvoidingView style={authStyles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={authStyles.scrollPadrao} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={authStyles.voltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Text style={authStyles.titulo}>{strings.auth.cadastro.titulo}</Text>
        <Text style={authStyles.subtitulo}>{strings.auth.cadastro.subtitulo}</Text>

        {/* Dados do Responsável */}
        <Text style={authStyles.secao}>{strings.auth.cadastro.secaoResponsavel}</Text>

        <TextInput style={authStyles.inputSimples} placeholder={strings.auth.cadastro.placeholderNomeResponsavel} placeholderTextColor={colors.textLightest}
          value={form.nomeResponsavel} onChangeText={(v) => updateForm('nomeResponsavel', v)} />

        <TextInput style={authStyles.inputSimples} placeholder={strings.auth.cadastro.placeholderEmail} placeholderTextColor={colors.textLightest}
          value={form.email} onChangeText={(v) => updateForm('email', v)}
          keyboardType="email-address" autoCapitalize="none" />

        <TextInput style={authStyles.inputSimples} placeholder={strings.auth.cadastro.placeholderTelefone} placeholderTextColor={colors.textLightest}
          value={form.telefone} onChangeText={(v) => updateForm('telefone', v)}
          keyboardType="phone-pad" />

        <TextInput style={authStyles.inputSimples} placeholder={strings.auth.cadastro.placeholderParentesco}
          placeholderTextColor={colors.textLightest}
          value={form.grauParentesco} onChangeText={(v) => updateForm('grauParentesco', v)} />

        <TextInput style={authStyles.inputSimples} placeholder={strings.auth.cadastro.placeholderSenha} placeholderTextColor={colors.textLightest}
          value={form.senha} onChangeText={(v) => updateForm('senha', v)} secureTextEntry />

        <TextInput style={authStyles.inputSimples} placeholder={strings.auth.cadastro.placeholderConfirmarSenha} placeholderTextColor={colors.textLightest}
          value={form.confirmarSenha} onChangeText={(v) => updateForm('confirmarSenha', v)} secureTextEntry />

        {/* Dados da Criança */}
        <Text style={authStyles.secao}>{strings.auth.cadastro.secaoCrianca}</Text>

        <TextInput style={authStyles.inputSimples} placeholder={strings.auth.cadastro.placeholderNomeCrianca} placeholderTextColor={colors.textLightest}
          value={form.nomeCrianca} onChangeText={(v) => updateForm('nomeCrianca', v)} />

        <TextInput style={authStyles.inputSimples} placeholder={strings.auth.cadastro.placeholderDataNascimento}
          placeholderTextColor={colors.textLightest}
          value={form.dataNascimento}
          onChangeText={(v) => updateForm('dataNascimento', formatarData(v))}
          keyboardType="numeric" maxLength={10} />

        <TouchableOpacity style={authStyles.botao} onPress={handleCadastro} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.textWhite} />
          ) : (
            <Text style={authStyles.botaoPrimarioTexto}>{strings.auth.cadastro.botaoCadastrar}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={authStyles.link}>
          <Text style={authStyles.linkTexto}>
            {strings.auth.cadastro.linkLogin} <Text style={authStyles.linkDestaque}>{strings.auth.cadastro.linkLoginDestaque}</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
