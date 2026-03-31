import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/colors';

// Telas de autenticação
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';

// Telas principais
import HomeScreen from '../screens/HomeScreen';
import ProgressoScreen from '../screens/ProgressoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import AjudaScreen from '../screens/AjudaScreen';

// Telas dos jogos
import SemaforoDoCorpoScreen from '../screens/Jogos/SemaforoDoCorpoScreen';
import ToqueBomVsRuimScreen from '../screens/Jogos/ToqueBomVsRuimScreen';
import PoderDoNaoScreen from '../screens/Jogos/PoderDoNaoScreen';
import AdultosDeConfiancaScreen from '../screens/Jogos/AdultosDeConfiancaScreen';

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
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: COLORS.primary, height: 120 },
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início', headerTitle: 'Protea' }} />
      <Tab.Screen name="Progresso" component={ProgressoScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Ajuda" component={AjudaScreen} />
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
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.textWhite,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="SemaforoDoCorpo" component={SemaforoDoCorpoScreen} options={{ title: 'Semáforo do Corpo' }} />
            <Stack.Screen name="ToqueBomVsRuim" component={ToqueBomVsRuimScreen} options={{ title: 'Toque Bom vs Ruim' }} />
            <Stack.Screen name="PoderDoNao" component={PoderDoNaoScreen} options={{ title: 'O Poder do Não' }} />
            <Stack.Screen name="AdultosDeConfianca" component={AdultosDeConfiancaScreen} options={{ title: 'Adultos de Confiança' }} />
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
