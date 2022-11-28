import { useUser } from '@hooks/useUser';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Button, FormControl, Heading, Input, Text, VStack, WarningOutlineIcon } from 'native-base';
import { useState } from 'react';

export type LoginProps = {
  user: string;
  setUser: (user: string) => void;
};

export function Login({ user, setUser }: LoginProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isInvalid, setIsInvalid] = useState(false);

  const handleOnChange = (value: string) => {
    setUser(value);
  };

  const handleOnPress = async () => {
    if (!(user.length > 0)) {
      setIsInvalid(false);
    }
    navigation.navigate('Home');
  };

  return (
    <VStack h="full" w="full" bg="dark.shade" space={2} alignItems="center" justifyContent="center">
      <Heading color="white">Bem vindo ao Mi.GO</Heading>
      <Text textAlign="center" color="light.shade">
        O Mi.GO é um aplicativo que te ajuda a organizar suas metas e tarefas.
      </Text>
      <Text textAlign="center" color="light.shade">
        Vamos direto ao que interessa!
      </Text>
      <FormControl isInvalid={isInvalid} p={10}>
        <Input
          placeholder="Qual é o seu nome?"
          accessibilityLabel="Qual é o seu nome?"
          color="light.shade"
          variant="underlined"
          onChangeText={handleOnChange}
          _invalid={{
            borderColor: 'red.500',
          }}
          _focus={{
            borderColor: 'light.accent',
          }}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Adicione seu nome ou apelido para continuar
        </FormControl.ErrorMessage>
      </FormControl>
      <Button size="md" rounded="lg" onPress={handleOnPress} variant="ghost" disabled={isInvalid}>
        Continuar
      </Button>
    </VStack>
  );
}
