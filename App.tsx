import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Mulish_400Regular, Mulish_700Bold, Mulish_300Light } from '@expo-google-fonts/mulish';

import { Routes } from '@routes/index';

import { THEME } from './src/theme';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Mulish_400Regular, Mulish_700Bold, Mulish_300Light });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <AppLoading />}
    </NativeBaseProvider>
  );
}