import { getRandomBytes } from 'expo-random';
import { Container, Input, FormControl } from 'native-base';
import { useCallback, useState } from 'react';

export function NewGoal() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleCreateNewTask = useCallback(() => {
    const data = {
      id: getRandomBytes(4),
      title,
      date,
      hour,
      completed,
    };
  }, [title, date, hour, completed]);

  return (
    <Container>
      <FormControl>
        <Input
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          autoCapitalize="sentences"
          autoCorrect={false}
        />
      </FormControl>
    </Container>
  );
}
