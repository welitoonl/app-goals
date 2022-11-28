import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Text, HStack, Icon, IconButton, VStack } from 'native-base';

type Props = {
  type: 'goal' | 'task';
};

export function GenericHeader({ type }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <HStack
      bg="dark.shade"
      pt="15%"
      pb={4}
      px={4}
      justifyContent="space-between"
      alignItems="center">
      <VStack>
        <Text fontSize="md" color="light.shade">
          Nova Meta
        </Text>
      </VStack>
      <IconButton
        icon={<Icon as={AntDesign} name="close" />}
        size="sm"
        color="light.shade"
        onPress={() => navigation.goBack()}
      />
    </HStack>
  );
}
