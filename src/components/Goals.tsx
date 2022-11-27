import { Divider, FlatList, Heading, VStack } from 'native-base';

import { EmptyStateGoal } from './EmptyStateGoal';
import { Goal, IGoal } from './Goal';

type Props = {
  goals: IGoal[];
};

export function Goals({ goals }: Props) {
  goals.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
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
        renderItem={({ item }) => <Goal goal={item} />}
        showsVerticalScrollIndicator={false}
        maxH={120}
      />
    </VStack>
  );
}
