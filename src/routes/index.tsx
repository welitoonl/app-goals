import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Box } from 'native-base';

import { AppRoutes } from './app.routes';

export function Routes() {
  const theme = DefaultTheme;

  return (
    <Box flex={1} bg="dark.shade">
      <NavigationContainer theme={theme}>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
}
