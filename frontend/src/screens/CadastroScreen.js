import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { authStyles } from '../styles/Auth.styles';
import { imagemApp } from '../constants/imagemAssets';

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
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }
    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Converter data DD/MM/AAAA para Date
    const partes = dataNascimento.split('/');
    if (partes.length !== 3) {
      Alert.alert('Atenção', 'Data de nascimento inválida. Use DD/MM/AAAA.');
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
      const msg = error.response?.data?.mensagem || 'Erro ao cadastrar. Tente novamente.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={authStyles.container}>
    <KeyboardAvoidingView style={authStyles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={authStyles.scrollPadrao} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={authStyles.voltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={authStyles.titulo}>Criar Conta</Text>
        <Text style={authStyles.subtitulo}>Preencha os dados do responsável e da criança</Text>

        {/* Dados do Responsável */}
        <Text style={authStyles.secao}>Dados do Responsável</Text>

        <TextInput style={authStyles.inputSimples} placeholder="Nome completo" placeholderTextColor={COLORS.textLightest}
          value={form.nomeResponsavel} onChangeText={(v) => updateForm('nomeResponsavel', v)} />

        <TextInput style={authStyles.inputSimples} placeholder="Email" placeholderTextColor={COLORS.textLightest}
          value={form.email} onChangeText={(v) => updateForm('email', v)}
          keyboardType="email-address" autoCapitalize="none" />

        <TextInput style={authStyles.inputSimples} placeholder="Telefone" placeholderTextColor={COLORS.textLightest}
          value={form.telefone} onChangeText={(v) => updateForm('telefone', v)}
          keyboardType="phone-pad" />

        <TextInput style={authStyles.inputSimples} placeholder="Grau de parentesco (ex: Mãe, Pai, Avó)"
          placeholderTextColor={COLORS.textLightest}
          value={form.grauParentesco} onChangeText={(v) => updateForm('grauParentesco', v)} />

        <TextInput style={authStyles.inputSimples} placeholder="Senha (mínimo 6 caracteres)" placeholderTextColor={COLORS.textLightest}
          value={form.senha} onChangeText={(v) => updateForm('senha', v)} secureTextEntry />

        <TextInput style={authStyles.inputSimples} placeholder="Confirmar senha" placeholderTextColor={COLORS.textLightest}
          value={form.confirmarSenha} onChangeText={(v) => updateForm('confirmarSenha', v)} secureTextEntry />

        {/* Dados da Criança */}
        <Text style={authStyles.secao}>Dados da Criança</Text>

        <TextInput style={authStyles.inputSimples} placeholder="Nome da criança" placeholderTextColor={COLORS.textLightest}
          value={form.nomeCrianca} onChangeText={(v) => updateForm('nomeCrianca', v)} />

        <TextInput style={authStyles.inputSimples} placeholder="Data de nascimento (DD/MM/AAAA)"
          placeholderTextColor={COLORS.textLightest}
          value={form.dataNascimento}
          onChangeText={(v) => updateForm('dataNascimento', formatarData(v))}
          keyboardType="numeric" maxLength={10} />

        <TouchableOpacity style={authStyles.botao} onPress={handleCadastro} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={COLORS.textWhite} />
          ) : (
            <Text style={authStyles.botaoPrimarioTexto}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={authStyles.link}>
          <Text style={authStyles.linkTexto}>
            Já tem uma conta? <Text style={authStyles.linkDestaque}>Entre aqui</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}