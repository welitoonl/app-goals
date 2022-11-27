import { Divider, FormControl, HStack, Pressable, Text, VStack } from 'native-base';
import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  start: Date;
  end: Date;
  allDay: boolean;
  onChange: (date: Date, field: string) => void;
};
export function DatePicker({ start, end, allDay, onChange }: Props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePickerRules, setDatePickerRules] = useState({
    minimumDate: new Date(),
    dateField: 'start',
  });

  const onChangedDate = (date: Date) => {
    onChange(date, datePickerRules.dateField);
    setDatePickerVisibility(false);
  };

  const openDatePicker = (field: string) => {
    setDatePickerVisibility(true);
    setDatePickerRules({
      minimumDate: field === 'start' ? new Date() : start,
      dateField: field,
    });
  };

  return (
    <VStack space={4}>
      <FormControl isInvalid={false}>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
            Começa
          </Text>
          <HStack space={1} justifyContent={allDay ? 'flex-end' : 'space-between'}>
            <Pressable bg="dark.shade" p={1} rounded="md" onPress={() => openDatePicker('start')}>
              <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
                {start.toLocaleDateString()}
              </Text>
            </Pressable>
            {!allDay && (
              <Pressable bg="dark.shade" p={1} rounded="md" onPress={() => openDatePicker('start')}>
                <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
                  {start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </Pressable>
            )}
          </HStack>
        </HStack>
        <Divider mt={2} borderColor="white" />
      </FormControl>
      <FormControl isInvalid={false}>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
            Termina
          </Text>
          <HStack space={1} justifyContent={allDay ? 'flex-end' : 'space-between'}>
            <Pressable bg="dark.shade" p={1} rounded="md" onPress={() => openDatePicker('end')}>
              <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
                {end.toLocaleDateString()}
              </Text>
            </Pressable>
            {!allDay && (
              <Pressable bg="dark.shade" p={1} rounded="md" onPress={() => openDatePicker('end')}>
                <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
                  {end.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </Pressable>
            )}
          </HStack>
        </HStack>
        <Divider mt={2} borderColor="white" />
      </FormControl>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={allDay ? 'date' : 'datetime'}
        minimumDate={datePickerRules.minimumDate}
        onConfirm={onChangedDate}
        onCancel={() => setDatePickerVisibility(false)}
        locale="pt_BR"
        buttonTextColorIOS="#000"
        display="inline"
      />
    </VStack>
  );
}
