import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';

// Telas de autenticação
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';

// Telas principais
import HomeScreen from '../screens/HomeScreen';
import ProgressoScreen from '../screens/ProgressoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import AjudaScreen from '../screens/AjudaScreen';

// Telas dos jogos
import SemaforoDoCorpoScreen from '../screens/jogos/SemaforoDoCorpoScreen';
import ToqueBomVsRuimScreen from '../screens/jogos/ToqueBomVsRuimScreen';
import PoderDoNaoScreen from '../screens/jogos/PoderDoNaoScreen';
import AdultosDeConfiancaScreen from '../screens/jogos/AdultosDeConfiancaScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home': iconName = focused ? 'home' : 'home-outline'; break;
            case 'Progresso': iconName = focused ? 'bar-chart' : 'bar-chart-outline'; break;
            case 'Perfil': iconName = focused ? 'person' : 'person-outline'; break;
            case 'Ajuda': iconName = focused ? 'help-circle' : 'help-circle-outline'; break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.textWhite,
        headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: strings.nav.tabs.home, headerTitle: strings.nav.headerHome }} />
      <Tab.Screen name="Progresso" component={ProgressoScreen} options={{ title: strings.nav.tabs.progresso }} />
      <Tab.Screen name="Perfil" component={PerfilScreen} options={{ title: strings.nav.tabs.perfil }} />
      <Tab.Screen name="Ajuda" component={AjudaScreen} options={{ title: strings.nav.tabs.ajuda }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();

  useEffect(() => {
    async function hideNativeSplash() {
      if (!loading) {
        await SplashScreen.hideAsync().catch(() => {
        });
      }
    }
    hideNativeSplash();
  }, [loading]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.textWhite,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="SemaforoDoCorpo" component={SemaforoDoCorpoScreen} options={{ title: strings.nav.jogos.semaforoDoCorpo }} />
            <Stack.Screen name="ToqueBomVsRuim" component={ToqueBomVsRuimScreen} options={{ title: strings.nav.jogos.toqueBomVsRuim }} />
            <Stack.Screen name="PoderDoNao" component={PoderDoNaoScreen} options={{ title: strings.nav.jogos.poderDoNao }} />
            <Stack.Screen name="AdultosDeConfianca" component={AdultosDeConfiancaScreen} options={{ title: strings.nav.jogos.adultoDeConfianca }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
