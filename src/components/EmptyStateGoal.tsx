import { MaterialIcons } from '@expo/vector-icons';
import { Text, VStack, Icon } from 'native-base';

export function EmptyStateGoal() {
  return (
    <VStack flex={1} my={4} space={1} justifyContent="center" alignItems="center">
      <Text color="light.shade" fontSize="xs">
        Você não metas, que tal criar uma nova meta?
      </Text>
      <Icon color="light.shade" as={MaterialIcons} name="emoji-symbols" size="md" />
    </VStack>
  );
}
