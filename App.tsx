import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
  Mulish_300Light,
} from '@expo-google-fonts/mulish';
import { Entypo } from '@expo/vector-icons';
import { Routes } from '@routes/index';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, Text, View } from 'native-base';
import { useCallback } from 'react';
import { StatusBar } from 'react-native';

import { THEME } from './src/theme';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Mulish_400Regular, Mulish_700Bold, Mulish_300Light });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {fontsLoaded ? (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Routes />
        </View>
      ) : (
        <View
          bg={THEME.colors.light.accent}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onLayout={onLayoutRootView}>
          <Text>Carregando! 👋</Text>
          <Entypo name="rocket" size={30} />
        </View>
      )}
    </NativeBaseProvider>
  );
}
