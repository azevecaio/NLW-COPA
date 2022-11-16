import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider , StatusBar} from "native-base";
import {useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { AuthContextProvider } from './src/context/AuthContent';

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';

import { THEME } from './src/styles/theme'; 

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold})
  return (
    //Compartilha informação abaixo com toda a aplicação
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor='transparent'
          translucent
        />
          {fontsLoaded ? <Routes /> : <Loading/>}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}