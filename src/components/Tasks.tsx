import { AntDesign } from '@expo/vector-icons';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { Divider, FlatList, Heading, HStack, Icon, Input, VStack } from 'native-base';
import React from 'react';

import { EmptyStateTask } from './EmptyStateTask';
import { Task } from './Task';

type Props = {
  tasks: TaskDTO[];
  update: (task: TaskDTO) => void;
  remove: (id: string) => void;
  fetch: (text?: string) => void;
  selectTask: (task: TaskDTO) => void;
};

export function Tasks({ tasks, update, remove, fetch, selectTask }: Props) {
  const [isSearch, setIsSearch] = React.useState(false);

  const handleSearch = (text: string) => {
    fetch(text);
    setIsSearch(true);
  };

  tasks.filter((item) => {
    const date = new Date(item.start);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });

  const checkTask = async (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      update(updatedTask);
    }
  };

  return (
    <VStack flex={1} m={6} space={2} maxH="450">
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
        data={tasks}
        rounded="lg"
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<EmptyStateTask isSearch={isSearch} />}
        ItemSeparatorComponent={() => <Divider mx={9} bg="light.accent" />}
        renderItem={({ item }) => (
          <Task task={item} checkTask={checkTask} selected={selectTask} remove={remove} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
