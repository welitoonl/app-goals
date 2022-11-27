import { SimpleLineIcons } from '@expo/vector-icons';
import { Text, Pressable, Stack, Icon, Checkbox } from 'native-base';
import { useEffect, useState } from 'react';

export interface ITask {
  id: number;
  title: string;
  date: string;
  hour: string;
  completed: boolean;
}

type Props = {
  task: ITask;
  checkTask: (id: number) => void;
};

export function Task({ task, checkTask }: Props) {
  const dateFormated = new Date(task.date + 'T' + task.hour);
  const [dateNow, setDateNowFormated] = useState(new Date());
  const hours = Math.floor((dateFormated.getTime() - dateNow.getTime()) / (1000 * 60 * 60));
  const minutes = Math.floor((dateFormated.getTime() - dateNow.getTime()) / (1000 * 60));
  const time = hours === 0 ? minutes + 'min' : hours + 'h';
  const isLate = dateFormated.getTime() < dateNow.getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      setDateNowFormated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Pressable w="full" overflow="hidden" p={2}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" maxW="80%" space={2} justifyContent="space-between">
          <Checkbox
            borderColor="light.accent"
            bg="dark.shade"
            isChecked={task.completed}
            value={String(task.id)}
            onChange={() => checkTask(task.id)}
          />
          <Text
            color={task.completed ? 'light.accent' : 'light.shade'}
            fontSize="xs"
            strikeThrough={task.completed}>
            {task.title}
          </Text>
        </Stack>
        <Stack direction="row" maxW="20%" alignItems="center">
          <Icon
            mr="1"
            size="2"
            color={task.completed ? 'light.accent' : 'light.shade'}
            name="clock"
            as={SimpleLineIcons}
          />
          <Text
            color={task.completed ? 'light.accent' : 'light.shade'}
            fontSize="xs"
            strikeThrough={task.completed}>
            {isLate ? `há ${time}` : `em ${time}`}
          </Text>
        </Stack>
      </Stack>
    </Pressable>
  );
}
