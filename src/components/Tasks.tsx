import { AntDesign } from '@expo/vector-icons';
import { Divider, FlatList, Heading, HStack, Icon, Input, VStack } from 'native-base';
import React from 'react';

import { EmptyStateTask } from './EmptyStateTask';
import { ITask, Task } from './Task';

type Props = {
  tasks: ITask[];
  checkTask: (id: number) => void;
};

export function Tasks({ tasks, checkTask }: Props) {
  const [isSearch, setIsSearch] = React.useState(false);
  const [taskList, setTaskList] = React.useState(tasks);

  tasks.sort((a, b) => {
    return new Date(a.date + 'T' + a.hour).getTime() - new Date(b.date + 'T' + b.hour).getTime();
  });
  const handleSearch = (text: string) => {
    const newData = tasks.filter((item) => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setIsSearch(text !== '');
    setTaskList(newData);
  };

  return (
    <VStack flex={1} m={6} space={2}>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading color="light.shade" size="xs">
          Tarefas
        </Heading>
        <Input
          placeholder="Pesquisar tarefa"
          color="light.shade"
          bg="dark.shade"
          w="1/2"
          variant="filled"
          borderRadius="10"
          py="1"
          px="2"
          InputRightElement={
            <Icon mr="2" size="4" color="light.shade" name="search1" as={AntDesign} />
          }
          onChangeText={(text) => handleSearch(text)}
        />
      </HStack>
      <FlatList
        data={taskList}
        rounded="lg"
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<EmptyStateTask isSearch={isSearch} />}
        ItemSeparatorComponent={() => <Divider mx={9} bg="light.accent" />}
        renderItem={({ item }) => <Task task={item} checkTask={checkTask} />}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
