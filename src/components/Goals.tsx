import { GoalDTO } from '@storage/goals/goalStorageDTO';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { Divider, FlatList, Heading, VStack } from 'native-base';

import { EmptyStateGoal } from './EmptyStateGoal';
import { Goal } from './Goal';

type Props = {
  goals: GoalDTO[];
  tasks: TaskDTO[];
  update: (goal: GoalDTO) => void;
  remove: (id: string) => void;
};

export function Goals({ goals, tasks, update, remove }: Props) {
  return (
    <VStack mx={6} mt={6} space={2}>
      <Heading color="light.shade" size="xs">
        Metas
      </Heading>
      <FlatList
        data={goals}
        rounded="lg"
        bg="dark.100"
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<EmptyStateGoal />}
        ItemSeparatorComponent={() => <Divider mx="3" thickness="2" bg="dark.shade" />}
        renderItem={({ item }) => (
          <Goal goal={item} tasks={tasks.filter((task) => task.idGoal === item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        maxH={120}
      />
    </VStack>
  );
}
