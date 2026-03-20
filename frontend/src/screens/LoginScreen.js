import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim().toLowerCase(), senha);
    } catch (error) {
      const msg = error.response?.data?.mensagem || 'Erro ao fazer login. Verifique suas credenciais.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="shield-checkmark" size={60} color={COLORS.primary} />
          </View>
          <Text style={styles.appName}>Protea</Text>
          <Text style={styles.subtitle}>Aprender brincando, proteger amando</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email do responsável"
              placeholderTextColor={COLORS.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor={COLORS.textLight}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Ionicons name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={COLORS.textWhite} />
            ) : (
              <Text style={styles.botaoTexto}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.link}>
            <Text style={styles.linkTexto}>
              Não tem conta? <Text style={styles.linkDestaque}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logoCircle: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center', alignItems: 'center', marginBottom: 16,
  },
  appName: { fontSize: 36, fontWeight: 'bold', color: COLORS.primary },
  subtitle: { fontSize: SIZES.md, color: COLORS.textLight, marginTop: 6 },
  form: { width: '100%' },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surface, borderRadius: SIZES.radius,
    paddingHorizontal: 16, marginBottom: 14,
    borderWidth: 1, borderColor: COLORS.border,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 16, fontSize: SIZES.lg, color: COLORS.text },
  botao: {
    backgroundColor: COLORS.primary, borderRadius: SIZES.radius,
    paddingVertical: 16, alignItems: 'center', marginTop: 10,
  },
  botaoTexto: { color: COLORS.textWhite, fontSize: SIZES.xl, fontWeight: 'bold' },
  link: { alignItems: 'center', marginTop: 20 },
  linkTexto: { fontSize: SIZES.md, color: COLORS.textLight },
  linkDestaque: { color: COLORS.primary, fontWeight: 'bold' },
});
