import { SimpleLineIcons } from '@expo/vector-icons';
import { GoalDTO } from '@storage/goals/goalStorageDTO';
import { Text, Pressable, Stack, Icon } from 'native-base';

type Props = {
  goal: GoalDTO;
};

export function Goal({ goal }: Props) {
  return (
    <Pressable w="full" overflow="hidden" p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Text color="light.shade" fontSize="xs" fontFamily="heading">
          {goal.title}
        </Text>
        <Stack direction="row" alignItems="center">
          <Text color="light.shade" mr={1} fontSize="xs">
            {goal.tasks.length}
          </Text>
          <Icon as={SimpleLineIcons} name="list" color="light.accent" size="xs" />
        </Stack>
      </Stack>
    </Pressable>
  );
}
