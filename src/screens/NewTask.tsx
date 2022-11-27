import { DatePicker } from '@components/DatePicker';
import { getRandomBytes } from 'expo-random';
import { Input, FormControl, VStack, Text, WarningOutlineIcon } from 'native-base';
import React, { useState } from 'react';

export function NewTask() {
  const [task, setTask] = useState({
    id: getRandomBytes(16),
    title: '',
    date: new Date(),
    completed: false,
  });

  const handleOnChange = (value: string) => {
    setTask({ ...task, title: value });
  };

  const handleOnChangeDate = (date: Date) => {
    setTask({
      ...task,
      date,
    });
  };

  return (
    <VStack h="full" w="full" bg="dark.100" space={4} rounded="3xl" p={4}>
      <Text fontSize="sm" color="light.shade">
        Nova Tarefa
      </Text>
      <FormControl isInvalid={false}>
        <Input
          placeholder="Descrição"
          color="light.shade"
          onChange={handleOnChange}
          variant="underlined"
        />
        <NativeBaseInput
          bg="gray.700"
          h={14}
          px={4}
          borderWidth={0}
          fontSize="md"
          color="white"
          fontFamily="body"
          placeholderTextColor="gray.300"
          isInvalid={invalid}
          _invalid={{
            borderWidth: 1,
            borderColor: 'red.500',
          }}
          _focus={{
            bgColor: 'gray.700',
            borderWidth: 1,
            borderColor: 'green.500',
          }}
          {...rest}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Adicione uma descrição para a tarefa.
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl>
        <DatePicker date={task.date} onChange={handleOnChangeDate} />
      </FormControl>
    </VStack>
  );
}
