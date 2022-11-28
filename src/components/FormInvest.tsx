import { useNavigation } from '@react-navigation/native';
import { AppNavigationTabRoutes } from '@screens/NewGoal';
import { GoalDTO } from '@storage/goals/goalStorageDTO';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import {
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  Pressable,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import React, { useState } from 'react';
import CurrencyInput from 'react-native-currency-input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import uuid from 'react-native-uuid';

type Props = {
  goal: GoalDTO;
  onChange: (date: Date) => void;
  addTasks: (tasks: TaskDTO[]) => void;
};

export function FormInvest({ goal, onChange, addTasks }: Props) {
  const navigation = useNavigation<AppNavigationTabRoutes>();
  const [error, setError] = React.useState('');
  const [value, setValue] = useState<number | null>(0);
  const [date, setDate] = useState(new Date());
  const [period, setPeriod] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePickerRules, setDatePickerRules] = useState({
    minimumDate: new Date(),
    dateField: 'start',
  });
  const dateNow = new Date();
  const dateNowToDate = date.getTime() - dateNow.getTime();
  const dateNowToDays = Math.ceil(dateNowToDate / (1000 * 3600 * 24));
  const dateNowTo = {
    weekly: Math.ceil(dateNowToDays / 7),
    monthly: Math.ceil(dateNowToDays / 30),
    halfMonthly: Math.ceil(dateNowToDays / 15),
  };
  const [valueDivided, setValueDivided] = useState('');
  const validate = () => {
    if (value === undefined) {
      setError('Adicione um valor para continuar');
      return false;
    }

    return true;
  };

  const onChangeValue = (value: number | null) => {
    setValue(value);
    changeValueDivided(period);
  };

  const handleChangeDate = (newDate: Date, field: string) => {
    if (field === 'when') {
      setDate(newDate);
    } else {
      onChange(newDate);
    }
    setDatePickerVisibility(false);
  };

  const openDatePicker = (field: string) => {
    setDatePickerVisibility(true);
    setDatePickerRules({
      minimumDate: field === 'when' ? new Date() : date,
      dateField: field,
    });
  };

  const handleChangePeriod = (period: string) => {
    if (
      (period === 'weekly' && dateNowTo.weekly <= 1) ||
      (period === 'monthly' && dateNowTo.monthly <= 1) ||
      (period === 'halfMonthly' && dateNowTo.halfMonthly <= 1)
    ) {
      setError('A data deve ser maior para o período selecionado');
      return;
    }
    setError('');
    setPeriod(period);
    changeValueDivided(period);
  };

  const changeValueDivided = (period: string) => {
    if (value !== null && period !== '') {
      if (period === 'weekly') {
        setValueDivided((value / dateNowTo.weekly).toFixed(2));
      } else if (period === 'monthly') {
        setValueDivided((value / dateNowTo.monthly).toFixed(2));
      } else if (period === 'halfMonthly') {
        setValueDivided((value / dateNowTo.halfMonthly).toFixed(2));
      }
    }
  };

  const handleAddMultipleTasks = () => {
    const tasks: TaskDTO[] = [];
    if (period === 'weekly') {
      for (let i = 0; i < dateNowTo.weekly; i++) {
        const newTask = {
          id: uuid.v4().toString(),
          idGoal: goal.id,
          title: `Guardar R$${valueDivided} para ${goal.title.toLowerCase()}`,
          start: new Date(date.getTime() + i * 7 * 24 * 60 * 60 * 1000),
          end: new Date(date.getTime() + i * 7 * 24 * 60 * 60 * 1000),
          allDay: true,
          completed: false,
        };
        tasks.push(newTask);
      }
    } else if (period === 'monthly') {
      for (let i = 0; i < dateNowTo.monthly; i++) {
        const newTask = {
          id: uuid.v4().toString(),
          idGoal: goal.id,
          title: `Guardar R$${valueDivided} para ${goal.title.toLowerCase()}`,
          start: new Date(date.getTime() + i * 30 * 24 * 60 * 60 * 1000),
          end: new Date(date.getTime() + i * 30 * 24 * 60 * 60 * 1000),
          allDay: true,
          completed: false,
        };
        tasks.push(newTask);
      }
    } else if (period === 'halfMonthly') {
      for (let i = 0; i < dateNowTo.halfMonthly; i++) {
        const newTask = {
          id: uuid.v4().toString(),
          idGoal: goal.id,
          title: `Guardar R$${valueDivided} para ${goal.title.toLowerCase()}`,
          start: new Date(date.getTime() + i * 15 * 24 * 60 * 60 * 1000),
          end: new Date(date.getTime() + i * 15 * 24 * 60 * 60 * 1000),
          allDay: true,
          completed: false,
        };
        tasks.push(newTask);
      }
    }
    const newTask = {
      id: uuid.v4().toString(),
      idGoal: goal.id,
      title: goal.title,
      start: date,
      end: date,
      allDay: true,
      completed: false,
    };
    tasks.push(newTask);
    addTasks(tasks);
  };

  const handleNextStep = () => {
    if (!validate()) {
      return;
    }
    handleAddMultipleTasks();
    navigation.navigate('Validar');
  };

  return (
    <VStack space={4} p={4} h="full" w="full" bg="dark.100" overflow="auto">
      <FormControl>
        <FormControl.Label>Quanto você pretende ou estipula guardar?</FormControl.Label>
        <CurrencyInput
          value={value}
          onChangeValue={(value) => onChangeValue(value)}
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          renderTextInput={(props) => (
            <Input
              {...props}
              color="light.shade"
              variant="underlined"
              _invalid={{
                borderColor: 'red.500',
              }}
              _focus={{
                borderColor: 'light.accent',
              }}
            />
          )}
        />
      </FormControl>
      <FormControl isInvalid={false}>
        <FormControl.Label>Até quando você pretende guardar?</FormControl.Label>
        <HStack alignItems="center" justifyContent="space-between">
          <HStack space={1} justifyContent="space-between">
            <Pressable bg="dark.shade" p={1} rounded="md" onPress={() => openDatePicker('when')}>
              <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
                {date.toLocaleDateString()}
              </Text>
            </Pressable>
          </HStack>
        </HStack>
        <Divider mt={2} borderColor="white" />
      </FormControl>
      <FormControl isInvalid={!(error === '') || !(error === undefined)}>
        <FormControl.Label>Qual o período que você pretende guardar?</FormControl.Label>
        <HStack space={2} alignItems="center">
          <Pressable
            bg={period === 'weekly' ? 'light.accent' : 'dark.shade'}
            p={1}
            rounded="md"
            onPress={() => handleChangePeriod('weekly')}>
            <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
              Semanal
            </Text>
          </Pressable>
          <Pressable
            bg={period === 'monthly' ? 'light.accent' : 'dark.shade'}
            p={1}
            rounded="md"
            onPress={() => handleChangePeriod('monthly')}>
            <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
              Mensal
            </Text>
          </Pressable>
          <Pressable
            bg={period === 'halfMonthly' ? 'light.accent' : 'dark.shade'}
            p={1}
            rounded="md"
            onPress={() => handleChangePeriod('halfMonthly')}>
            <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
              Quinzenal
            </Text>
          </Pressable>
        </HStack>

        <Divider mt={2} borderColor="white" />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error}
        </FormControl.ErrorMessage>
      </FormControl>
      {valueDivided !== '' && (
        <>
          <Text color="light.500">
            Você terá que guardar R$ {valueDivided} no periodo selecionado, serão criadas tarefas
            para você lembrar de guardar esse valor.
          </Text>
          <FormControl isInvalid={false}>
            <FormControl.Label>Defina uma data de conclusão da sua meta</FormControl.Label>
            <HStack alignItems="center" justifyContent="space-between">
              <HStack space={1} justifyContent="space-between">
                <Pressable
                  bg="dark.shade"
                  p={1}
                  rounded="md"
                  onPress={() => openDatePicker('goalDate')}>
                  <Text fontSize="xs" color="light.shade" borderStyle="dashed" borderColor="main">
                    {date.toLocaleDateString()}
                  </Text>
                </Pressable>
              </HStack>
            </HStack>
            <Divider mt={2} borderColor="white" />
          </FormControl>
          <Button size="md" rounded="lg" variant="ghost" onPress={handleNextStep}>
            Próximo passo
          </Button>
        </>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={datePickerRules.minimumDate}
        onConfirm={(date) => handleChangeDate(date, datePickerRules.dateField)}
        onCancel={() => setDatePickerVisibility(false)}
        locale="pt_BR"
        cancelTextIOS="Cancelar"
        confirmTextIOS="Confirmar"
        buttonTextColorIOS="#000"
        display="inline"
      />
    </VStack>
  );
}
