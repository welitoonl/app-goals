import { Divider, HStack, Pressable, Text } from 'native-base';
import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  date: Date;
  onChange: (date: Date) => void;
};
export function DatePicker({ date, onChange }: Props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  return (
    <>
      <HStack justifyContent="space-between">
        <Pressable onPress={() => setDatePickerVisibility(true)}>
          <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
            {date.toLocaleDateString()} -{' '}
            {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </Pressable>
        <Pressable onPress={() => setDatePickerVisibility(true)}>
          <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
            {date.toLocaleDateString()} -{' '}
            {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          minimumDate={new Date()}
          onConfirm={onChange}
          onCancel={() => setDatePickerVisibility(false)}
          locale="pt_BR"
          buttonTextColorIOS="#000"
          display="inline"
        />
      </HStack>
      <Divider mt={2} borderColor="white" />
    </>
  );
}
