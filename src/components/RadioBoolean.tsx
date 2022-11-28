import { Divider, HStack, Pressable, Text } from 'native-base';

type RadioBooleanProps = {
  name: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
};
export function RadioBoolean({ value, onChange }: RadioBooleanProps) {
  return (
    <>
      <HStack space={2} alignItems="center">
        <Pressable
          bg={value === 'yes' ? 'light.accent' : 'dark.shade'}
          p={1}
          rounded="md"
          onPress={() => onChange('yes')}>
          <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
            Sim
          </Text>
        </Pressable>
        <Pressable
          bg={value === 'no' ? 'light.accent' : 'dark.shade'}
          p={1}
          rounded="md"
          onPress={() => onChange('no')}>
          <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
            Não
          </Text>
        </Pressable>
      </HStack>
      <Divider mt={2} borderColor="white" />
    </>
  );
}
