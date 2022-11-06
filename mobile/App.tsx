import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider , StatusBar} from "native-base";
import {useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { SignIn } from './src/screens/SignIn'
import { Loading } from './src/components/Loading';
import { New } from './src/screens/New'
import { Find } from './src/screens/Find'
import { Pools } from './src/screens/Pools'
import { THEME } from './src/styles/theme'; 

import { AuthContextProvider } from './src/context/AuthContent';

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
          {fontsLoaded ? <Pools/> : <Loading/>}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}