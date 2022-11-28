import { Divider, FormControl, HStack, Text, VStack } from 'native-base';
import { Switch } from 'react-native';

import { DatePicker } from './DatePicker';

type DateFormProps = {
  label: string;
  start: Date;
  end: Date;
  allDay: boolean;
  onChange: (date: Date, field: string) => void;
  toggleAllDay: () => void;
};

export function DateForm({ label, start, end, allDay, onChange, toggleAllDay }: DateFormProps) {
  return (
    <>
      <FormControl mb={4}>
        <FormControl.Label mb={4}>{label}</FormControl.Label>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="xs" color="light.shade">
            Dia inteiro
          </Text>
          <VStack justifyContent="flex-end">
            <Switch
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              value={allDay}
              onValueChange={toggleAllDay}
            />
          </VStack>
        </HStack>
        <Divider mt={1} borderColor="white" />
      </FormControl>
      <FormControl>
        <DatePicker start={start} end={end} allDay={allDay} onChange={onChange} />
      </FormControl>
    </>
  );
}
