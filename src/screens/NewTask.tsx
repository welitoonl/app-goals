import { DatePicker } from '@components/DatePicker';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { getRandomBytes } from 'expo-random';
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

export type NewTaskProps = {
  addTask: (task: TaskDTO) => void;
};

export function NewTask({ addTask }: NewTaskProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [task, setTask] = useState({
    id: getRandomBytes(16),
    title: '',
    start: new Date(),
    end: new Date(),
    allDay: false,
    completed: false,
  });

  const handleOnChange = (value: string) => {
    setTask({ ...task, title: value });
  };

  const handleOnChangeDate = (date: Date, field: string) => {
    if (field === 'start' && date > task.end) {
      setTask({ ...task, start: date, end: date });
      return;
    }

    setTask({
      ...task,
      [field]: date,
    });
  };

  const toggleSwitch = () => setTask({ ...task, allDay: !task.allDay });

  return (
    <VStack h="full" w="full" alignContent="center" bg="dark.100" space={4} rounded="3xl" p={4}>
      <HStack justifyContent="space-between">
        <Text fontSize="md" color="light.shade">
          Nova Tarefa
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
          placeholder="Descrição"
          accessibilityLabel="Descrição"
          color="light.shade"
          onChange={() => handleOnChange}
          variant="underlined"
          _invalid={{
            borderColor: 'red.500',
          }}
          _focus={{
            borderColor: 'light.accent',
          }}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Adicione uma descrição para a tarefa.
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
              value={task.allDay}
              onValueChange={toggleSwitch}
            />
          </VStack>
        </HStack>
        <Divider mt={1} borderColor="white" />
      </FormControl>
      <DatePicker
        start={task.start}
        end={task.end}
        allDay={task.allDay}
        onChange={handleOnChangeDate}
      />
      <Button size="md" rounded="lg" variant="ghost" onPress={() => addTask}>
        Incluir
      </Button>
    </VStack>
  );
}
