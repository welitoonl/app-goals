import { SimpleLineIcons } from '@expo/vector-icons';
import { GoalDTO } from '@storage/goals/goalStorageDTO';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { Text, Stack, Icon, IconButton, HStack, AlertDialog, Button } from 'native-base';
import React from 'react';

type Props = {
  goal: GoalDTO;
  tasks: TaskDTO[];
  remove: (id: string) => void;
};

export function Goal({ goal, tasks, remove }: Props) {
  const tasksCompleted = tasks.filter((task) => task.completed).length;
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  const handleRemove = () => {
    remove(goal.id);
    onClose();
  };

  return (
    <HStack w="full" flex={1} p={2}>
      <Text color="light.shade" flex={1} fontSize="xs" fontFamily="heading">
        {goal.title}
      </Text>
      <Stack direction="row" alignItems="center">
        <Icon as={SimpleLineIcons} name="list" color="light.accent" size="xs" />
        <Text color="light.shade" ml={1} fontSize="xs">
          {tasksCompleted} / {tasks.length}
        </Text>
      </Stack>
      <IconButton
        size="xs"
        variant="unstyled"
        icon={<Icon size="xs" color="red.300" name="trash" as={SimpleLineIcons} />}
        onPress={() => setIsOpen(!isOpen)}
      />
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Deletar meta</AlertDialog.Header>
          <AlertDialog.Body>
            Ao excluir a meta, todas as tarefas relacionadas serão excluídas também. Tem certeza que
            deseja excluir?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancelar
              </Button>
              <Button variant="ghost" colorScheme="red" onPress={handleRemove} ref={cancelRef}>
                Deletar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </HStack>
  );
}
