import { SimpleLineIcons } from '@expo/vector-icons';
import { Text, Pressable, Stack, Icon } from 'native-base';

import { ITask } from './Task';

export interface IGoal {
  id: number;
  title: string;
  description: string;
  tasks: ITask[];
  date: string;
}

type Props = {
  goal: IGoal;
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
