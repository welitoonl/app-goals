import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import {
  Text,
  Icon,
  Checkbox,
  HStack,
  Box,
  VStack,
  IconButton,
  AlertDialog,
  Button,
} from 'native-base';
import React, { useEffect, useState } from 'react';

type Props = {
  task: TaskDTO;
  checkTask: (id: string) => void;
  selected: (task: TaskDTO) => void;
  remove: (id: string) => void;
};

export function Task({ task, checkTask, selected, remove }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const startDate = new Date(task.start);
  const endDate = new Date(task.end);
  const [dateNow, setDateNowFormated] = useState(new Date());
  const hours = Math.floor((startDate.getTime() - dateNow.getTime()) / (1000 * 60 * 60));
  const hoursEnd = Math.floor((endDate.getTime() - dateNow.getTime()) / (1000 * 60 * 60));
  const startDateFormated =
    hours > 24 || hours < -24
      ? startDate.toLocaleDateString()
      : startDate.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });
  const endDateFormated =
    hoursEnd > 24 || hoursEnd < -24
      ? endDate.toLocaleDateString()
      : endDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const timeText = task.allDay
    ? startDate.toLocaleDateString() === dateNow.toLocaleDateString()
      ? 'Hoje'
      : startDateFormated
    : `${startDateFormated} ~ ${endDateFormated}`;
  const isLate = endDate.getTime() < dateNow.getTime() && !task.completed && !task.allDay;

  useEffect(() => {
    const interval = setInterval(() => {
      setDateNowFormated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSelected = () => {
    selected(task);
    navigation.navigate('NewTask');
  };

  const handleRemove = () => {
    remove(task.id);
    onClose();
  };

  return (
    <Box w="full" overflow="hidden" p={2}>
      <HStack space={2} justifyContent="space-between">
        <HStack space={2} flex={1} alignItems="center">
          <Checkbox
            borderColor="light.accent"
            accessibilityLabel="Check task"
            bg="dark.shade"
            isChecked={task.completed}
            value={String(task.id)}
            onChange={() => checkTask(task.id)}
          />
          <VStack textAlign="left" space={1} w="auto">
            <Text
              color={task.completed ? 'light.accent' : 'light.shade'}
              fontSize="xs"
              onPress={handleSelected}
              strikeThrough={task.completed}>
              {task.title}
            </Text>
            <HStack space={1} alignItems="center" w="auto">
              <Icon
                mr="1"
                size="2"
                color={task.completed ? 'light.accent' : 'light.shade'}
                name="clock"
                as={SimpleLineIcons}
              />
              <Text
                color={task.completed ? 'light.accent' : isLate ? 'red.300' : 'light.shade'}
                fontSize="xs"
                strikeThrough={task.completed}>
                {timeText}
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <IconButton
          size="xs"
          variant="unstyled"
          icon={<Icon size="xs" color="red.300" name="trash" as={SimpleLineIcons} />}
          onPress={() => setIsOpen(!isOpen)}
        />
      </HStack>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Deletar tarefa</AlertDialog.Header>
          <AlertDialog.Body>
            Você está deletando uma tarefa que está vinculada a uma meta. Deseja continuar?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancelar
              </Button>
              <Button colorScheme="danger" variant="ghost" onPress={handleRemove}>
                Deletar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
}
