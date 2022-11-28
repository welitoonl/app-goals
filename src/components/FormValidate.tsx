import { AntDesign } from '@expo/vector-icons';
import { GoalDTO } from '@storage/goals/goalStorageDTO';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { Button, Divider, FlatList, Heading, HStack, Icon, Input, Text, VStack } from 'native-base';
import { useState } from 'react';

import { TaskSimple } from './TaskSimple';

type Props = {
  goal: GoalDTO;
  tasks: TaskDTO[];
  updateTask: (task: TaskDTO) => void;
  save: () => void;
};

export function FormValidate({ goal, tasks, updateTask, save }: Props) {
  const [tasksList, setTasksList] = useState(tasks);
  const handleSearchTasks = (text: string) => {
    const tasksFiltered = tasks.filter((item) => {
      const itemData = item.title.toUpperCase();
      const textData = text?.toUpperCase();
      return textData ? itemData.indexOf(textData) > -1 : true;
    });
    setTasksList(tasksFiltered);
  };

  return (
    <VStack space={4} p={4} h="full" w="full" bg="dark.100" overflow="auto">
      <VStack>
        <Heading color="light.shade">Uma nova aquisição! Que legal!</Heading>
        <Text color="light.500">
          Certo, logo abaixo você vai encontrar todas as tarefas que você precisa fazer para
          conseguir realizar essa aquisição. Você pode adicionar novas tarefas, editar as que já
          foram criadas.
        </Text>
      </VStack>
      <VStack space={4} p={4} flex={1} rounded="lg" maxH={500} bg="dark.shade">
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
            onChangeText={(text) => handleSearchTasks(text)}
          />
        </HStack>
        <FlatList
          data={tasksList}
          rounded="lg"
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <Divider mx={9} bg="light.400" />}
          renderItem={({ item }) => <TaskSimple task={item} />}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
      <Button size="md" rounded="lg" variant="ghost" onPress={save}>
        Próximo passo
      </Button>
    </VStack>
  );
}
