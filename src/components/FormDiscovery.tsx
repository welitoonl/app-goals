import { useNavigation } from '@react-navigation/native';
import { AppNavigationTabRoutes } from '@screens/NewGoal';
import { GoalDTO } from '@storage/goals/goalStorageDTO';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { Button, Divider, FormControl, Pressable, Text, TextArea, VStack } from 'native-base';
import React, { useState } from 'react';
import uuid from 'react-native-uuid';

import { DateForm } from './DateForm';
import { FormControlWithInput } from './FormControlWithInput';
import { RadioBoolean } from './RadioBoolean';

type Props = {
  goal: GoalDTO;
  onChange: (value: string, field: string) => void;
  addTask: (task: TaskDTO) => void;
};

export function FormDiscovery({ goal, onChange, addTask }: Props) {
  const navigation = useNavigation<AppNavigationTabRoutes>();
  const [knowWhat, setKnowWhat] = useState('yes');
  const [error, setError] = React.useState('');

  const validate = () => {
    if (goal.title === undefined) {
      setError('Adicione um título a sua meta');
      return false;
    } else if (goal.title.length < 6) {
      setError('O título é muito pequeno');
      return false;
    }
    return true;
  };

  const [task, setTask] = useState<TaskDTO>({
    id: uuid.v4().toString(),
    idGoal: goal.id,
    title: 'Descobrir o que irei adquirir',
    start: new Date(),
    end: new Date(),
    allDay: false,
    completed: false,
  });

  const onChangeTitle = (value: string) => {
    onChange(value, 'title');
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

  const onChangeDescription = (value: string) => {
    onChange(value, 'description');
  };

  const onChangeKnowWhat = (value: string) => {
    setKnowWhat(value);
  };

  const handleNextStep = () => {
    if (!validate()) {
      return;
    }

    if (knowWhat === 'yes') {
      navigation.navigate('Investir');
    } else {
      addTask(task);
      navigation.navigate('Investir');
    }
  };

  return (
    <VStack space={4} p={4} h="full" w="full" bg="dark.100" overflow="auto">
      <FormControlWithInput
        label="Qual a sua meta?"
        placeholder="Comprar um carro..."
        value={goal.title}
        onChange={onChangeTitle}
        error={error}
      />
      <FormControl>
        <FormControl.Label>Descreva sua meta</FormControl.Label>
        <TextArea
          placeholder="Quero comprar um carro..."
          accessibilityLabel="Descreva sua meta"
          color="light.shade"
          h="16"
          value={goal.description}
          variant="underlined"
          onChangeText={onChangeDescription}
          _invalid={{
            borderColor: 'red.500',
          }}
          _focus={{
            borderColor: 'light.accent',
          }}
          autoCompleteType={undefined}
        />
      </FormControl>
      <FormControl>
        <FormControl.Label mb={4}>Qual o tipo de meta?</FormControl.Label>
        <Pressable
          bg={goal.type === 'aquisicao' ? 'light.accent' : 'dark.shade'}
          p={1}
          w="24"
          justifyContent="center"
          alignItems="center"
          rounded="md">
          <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
            Aquisição
          </Text>
        </Pressable>
        <Divider mt={2} borderColor="white" />
      </FormControl>
      <FormControl>
        <FormControl.Label mb={4}>Você sabe o que irá adquirir?</FormControl.Label>
        <RadioBoolean
          value={knowWhat}
          onChange={onChangeKnowWhat}
          name="knowWhat"
          label="Você sabe o que irá adquirir?"
        />
      </FormControl>
      {knowWhat === 'yes' && (
        <Button size="md" rounded="lg" variant="ghost" onPress={handleNextStep}>
          Próximo passo
        </Button>
      )}
      {knowWhat === 'no' && (
        <>
          <DateForm
            label="Bom, o primeiro passo é descobrir! Defina uma data para realizar esta tarefa."
            start={task.start}
            end={task.end}
            allDay={task.allDay}
            onChange={handleOnChangeDate}
            toggleAllDay={toggleSwitch}
          />
          <Button size="md" rounded="lg" variant="ghost" onPress={handleNextStep}>
            Próximo passo
          </Button>
        </>
      )}
    </VStack>
  );
}
