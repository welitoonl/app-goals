import { SimpleLineIcons } from '@expo/vector-icons';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { Text, Pressable, Stack, Icon, Divider } from 'native-base';
import { useEffect, useState } from 'react';

type Props = {
  task: TaskDTO;
};

export function TaskSimple({ task }: Props) {
  const startDate = new Date(task.start);
  const endDate = new Date(task.end);
  const [dateNow, setDateNowFormated] = useState(new Date());
  const hours = Math.floor((startDate.getTime() - dateNow.getTime()) / (1000 * 60 * 60));
  const minutes = Math.floor((startDate.getTime() - dateNow.getTime()) / (1000 * 60));
  const timeText =
    minutes <= -60 || minutes >= 60 ? Math.abs(hours) + 'h' : Math.abs(minutes) + 'min';
  const isLate = endDate.getTime() < dateNow.getTime();

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
          <Text color="light.shade" fontSize="xs">
            {task.title}
          </Text>
        </Stack>
        <Stack direction="row" maxW="20%" alignItems="center">
          <Icon mr="1" size="2" color="light.shade" name="clock" as={SimpleLineIcons} />
          <Text color="light.shade" fontSize="xs">
            {isLate ? `há ${timeText}` : `em ${timeText}`}
          </Text>
        </Stack>
      </Stack>
      <Divider mx={9} mt={2} bg="light.400" />
    </Pressable>
  );
}
