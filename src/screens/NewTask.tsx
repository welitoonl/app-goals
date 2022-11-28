import { DatePicker } from '@components/DatePicker';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import {
  Input,
  FormControl,
  VStack,
  Text,
  WarningOutlineIcon,
  HStack,
  Divider,
  Button,
  IconButton,
  Icon,
} from 'native-base';
import React, { useState } from 'react';
import { Switch } from 'react-native';
import uuid from 'react-native-uuid';

export type NewTaskProps = {
  task?: TaskDTO;
  createTask: (tasks: TaskDTO[]) => Promise<void>;
  updateTask: (task: TaskDTO) => Promise<void>;
  setSelectedTask: (task: TaskDTO) => void;
};
export function NewTask({ task, createTask, updateTask, setSelectedTask }: NewTaskProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [newTask, setTask] = useState<TaskDTO>({
    id: task?.id ?? uuid.v4().toString(),
    title: task?.title ?? '',
    start: task?.start ? new Date(task?.start) : new Date(),
    end: task?.end ? new Date(task?.end) : new Date(),
    allDay: task?.allDay ?? false,
    completed: task?.completed ?? false,
  });

  const handleOnChange = (value: string) => {
    setTask({ ...newTask, title: value });
  };

  const handleOnChangeDate = (date: Date, field: string) => {
    if (field === 'start' && date > newTask.end) {
      setTask({ ...newTask, start: date, end: date });
      return;
    }

    setTask({
      ...newTask,
      [field]: date,
    });
  };

  const toggleSwitch = () => setTask({ ...newTask, allDay: !newTask.allDay });

  const handleOnSave = async () => {
    if (task) {
      await updateTask(newTask);
    } else {
      await createTask([newTask]);
    }
    navigation.navigate('Home');
  };

  return (
    <VStack h="full" w="full" alignContent="center" bg="dark.100" space={4} rounded="3xl" p={4}>
      <HStack justifyContent="space-between">
        <Text fontSize="md" color="light.shade">
          {task ? 'Edição de Tarefa' : 'Nova Tarefa'}
        </Text>
        <IconButton
          icon={<Icon as={AntDesign} name="close" />}
          size="sm"
          color="light.shade"
          onPress={() => navigation.goBack()}
        />
      </HStack>
      <FormControl isInvalid={false}>
        <Input
          placeholder="Nome da tarefa*"
          accessibilityLabel="Nome da tarefa (obrigatório)"
          color="light.shade"
          onChangeText={handleOnChange}
          variant="underlined"
          _invalid={{
            borderColor: 'red.500',
          }}
          _focus={{
            borderColor: 'light.accent',
          }}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Adicione um nome para a tarefa.
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="xs" color="light.shade">
            Dia inteiro
          </Text>
          <VStack justifyContent="flex-end">
            <Switch
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              value={newTask.allDay}
              onValueChange={toggleSwitch}
            />
          </VStack>
        </HStack>
        <Divider mt={1} borderColor="white" />
      </FormControl>
      <DatePicker
        start={newTask.start}
        end={newTask.end}
        allDay={newTask.allDay}
        onChange={handleOnChangeDate}
      />
      <Button size="md" rounded="lg" variant="ghost" onPress={handleOnSave}>
        {task ? 'Atualizar' : 'Incluir'}
      </Button>
    </VStack>
  );
}
