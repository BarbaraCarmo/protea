import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.titulo}>Criar Conta</Text>
        <Text style={styles.subtitulo}>Preencha os dados do responsável e da criança</Text>

        {/* Dados do Responsável */}
        <Text style={styles.secao}>Dados do Responsável</Text>

        <TextInput style={styles.input} placeholder="Nome completo" placeholderTextColor={COLORS.textLight}
          value={form.nomeResponsavel} onChangeText={(v) => updateForm('nomeResponsavel', v)} />

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor={COLORS.textLight}
          value={form.email} onChangeText={(v) => updateForm('email', v)}
          keyboardType="email-address" autoCapitalize="none" />

        <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor={COLORS.textLight}
          value={form.telefone} onChangeText={(v) => updateForm('telefone', v)}
          keyboardType="phone-pad" />

        <TextInput style={styles.input} placeholder="Grau de parentesco (ex: Mãe, Pai, Avó)"
          placeholderTextColor={COLORS.textLight}
          value={form.grauParentesco} onChangeText={(v) => updateForm('grauParentesco', v)} />

        <TextInput style={styles.input} placeholder="Senha (mínimo 6 caracteres)" placeholderTextColor={COLORS.textLight}
          value={form.senha} onChangeText={(v) => updateForm('senha', v)} secureTextEntry />

        <TextInput style={styles.input} placeholder="Confirmar senha" placeholderTextColor={COLORS.textLight}
          value={form.confirmarSenha} onChangeText={(v) => updateForm('confirmarSenha', v)} secureTextEntry />

        {/* Dados da Criança */}
        <Text style={styles.secao}>Dados da Criança</Text>

        <TextInput style={styles.input} placeholder="Nome da criança" placeholderTextColor={COLORS.textLight}
          value={form.nomeCrianca} onChangeText={(v) => updateForm('nomeCrianca', v)} />

        <TextInput style={styles.input} placeholder="Data de nascimento (DD/MM/AAAA)"
          placeholderTextColor={COLORS.textLight}
          value={form.dataNascimento}
          onChangeText={(v) => updateForm('dataNascimento', formatarData(v))}
          keyboardType="numeric" maxLength={10} />

        <TouchableOpacity style={styles.botao} onPress={handleCadastro} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={COLORS.textWhite} />
          ) : (
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 24, paddingBottom: 40 },
  voltar: { marginBottom: 10 },
  titulo: { fontSize: SIZES.title, fontWeight: 'bold', color: COLORS.text, marginBottom: 6 },
  subtitulo: { fontSize: SIZES.md, color: COLORS.textLight, marginBottom: 24 },
  secao: {
    fontSize: SIZES.lg, fontWeight: 'bold', color: COLORS.primary,
    marginTop: 16, marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.radius,
    paddingHorizontal: 16, paddingVertical: 14, fontSize: SIZES.lg,
    color: COLORS.text, marginBottom: 12,
    borderWidth: 1, borderColor: COLORS.border,
  },
  botao: {
    backgroundColor: COLORS.primary, borderRadius: SIZES.radius,
    paddingVertical: 16, alignItems: 'center', marginTop: 20,
  },
  botaoTexto: { color: COLORS.textWhite, fontSize: SIZES.xl, fontWeight: 'bold' },
});
