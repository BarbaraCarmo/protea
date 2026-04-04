import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { authStyles } from '../styles/Auth.styles';
import { imagemApp } from '../constants/imagemAssets';

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
      style={authStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={authStyles.scrollCentralizado} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={authStyles.logoContainer}>
          <View style={authStyles.logoIcone}>
          <Image source={imagemApp.logo} style={authStyles.logoIcone} />
          </View>
          <Text style={authStyles.appName}>Protea</Text>
          <Text style={authStyles.subtitle}>Aprender brincando, proteger amando</Text>
        </View>

        {/* Formulário */}
        <View style={authStyles.form}>
          <View style={authStyles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textLight} style={authStyles.inputIcone} />
            <TextInput
              style={authStyles.input}
              placeholder="Email do responsável"
              placeholderTextColor={COLORS.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={authStyles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} style={authStyles.inputIcone} />
            <TextInput
              style={authStyles.input}
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

          <TouchableOpacity style={authStyles.botao} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={COLORS.textWhite} />
            ) : (
              <Text style={authStyles.botaoPrimarioTexto}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={authStyles.link}>
            <Text style={authStyles.linkTexto}>
              Não tem conta? <Text style={authStyles.linkDestaque}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}