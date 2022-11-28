import { SimpleLineIcons } from '@expo/vector-icons';
import { GoalDTO } from '@storage/goals/goalStorageDTO';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { Text, Pressable, Stack, Icon } from 'native-base';

type Props = {
  goal: GoalDTO;
  tasks: TaskDTO[];
};

export function Goal({ goal, tasks }: Props) {
  return (
    <Pressable w="full" overflow="hidden" p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Text color="light.shade" fontSize="xs" fontFamily="heading">
          {goal.title}
        </Text>
        <Stack direction="row" alignItems="center">
          <Text color="light.shade" mr={1} fontSize="xs">
            {tasks.length}
          </Text>
          <Icon as={SimpleLineIcons} name="list" color="light.accent" size="xs" />
        </Stack>
      </Stack>
    </Pressable>
  );
}
