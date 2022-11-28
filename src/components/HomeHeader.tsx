import { Heading, HStack, Text, VStack } from 'native-base';

type Props = {
  name: string;
};

export function HomeHeader({ name }: Props) {
  return (
    <HStack bg="dark.100" pt="15%" pb={4} px={4} alignItems="center">
      <VStack flex={1} alignItems="center">
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Olá, {name}
        </Heading>
        <Text color="gray.100" fontSize="sm">
          O que deseja fazer hoje?
        </Text>
      </VStack>
    </HStack>
  );
}
