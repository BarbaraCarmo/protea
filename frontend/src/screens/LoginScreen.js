import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
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
      Alert.alert(strings.auth.alertas.tituloAtencao, strings.auth.alertas.camposObrigatorios);
      return;
    }
    setLoading(true);
    try {
      await login(email.trim().toLowerCase(), senha);
    } catch (error) {
      const msg = error.response?.data?.mensagem || strings.auth.alertas.erroLogin;
      Alert.alert(strings.auth.alertas.tituloErro, msg);
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
        <View style={authStyles.logoContainer}>
          <View style={authStyles.logoIcone}>
          <Image source={imagemApp.logo} style={authStyles.logoIcone} />
          </View>
          <Text style={authStyles.appName}>{strings.app.nome}</Text>
          <Text style={authStyles.subtitle}>{strings.app.tagline}</Text>
        </View>

        <View style={authStyles.form}>
          <View style={authStyles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={colors.textLight} style={authStyles.inputIcone} />
            <TextInput
              style={authStyles.input}
              placeholder={strings.auth.login.placeholderEmail}
              placeholderTextColor={colors.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={authStyles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={colors.textLight} style={authStyles.inputIcone} />
            <TextInput
              style={authStyles.input}
              placeholder={strings.auth.login.placeholderSenha}
              placeholderTextColor={colors.textLight}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Ionicons name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={authStyles.botao} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={colors.textWhite} />
            ) : (
              <Text style={authStyles.botaoPrimarioTexto}>{strings.auth.login.botaoEntrar}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={authStyles.link}>
            <Text style={authStyles.linkTexto}>
              {strings.auth.login.linkCadastro} <Text style={authStyles.linkDestaque}>{strings.auth.login.linkCadastroDestaque}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
