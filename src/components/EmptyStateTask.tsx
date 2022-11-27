import { Fontisto, Entypo } from '@expo/vector-icons';
import { Text, VStack, Icon } from 'native-base';

type Props = {
  isSearch: boolean;
};

export function EmptyStateTask({ isSearch }: Props) {
  return (
    <VStack flex={1} my={4} space={1} justifyContent="center" alignItems="center">
      {isSearch ? (
        <>
          <Text color="light.shade" fontSize="xs">
            Não encontramos nenhuma tarefa.
          </Text>
          <Icon color="light.shade" as={Fontisto} name="frowning" size="md" />
        </>
      ) : (
        <>
          <Text color="light.shade" fontSize="xs">
            Você não tem tarefas
          </Text>
          <Text color="light.shade" fontSize="sm">
            Que tal criar uma nova tarefa?
          </Text>
          <Icon color="light.shade" as={Entypo} name="emoji-flirt" size="md" />
        </>
      )}
    </VStack>
  );
}
