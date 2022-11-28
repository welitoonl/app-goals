import { FormDiscovery } from '@components/FormDiscovery';
import { FormInvest } from '@components/FormInvest';
import { FormValidate } from '@components/FormValidate';
import { GenericHeader } from '@components/GenericHeader';
import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { GoalDTO, GoalsType } from '@storage/goals/goalStorageDTO';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { VStack } from 'native-base';
import React, { useState } from 'react';
import uuid from 'react-native-uuid';

export type NewTaskProps = {
  createGoal: (goal: GoalDTO) => Promise<void>;
  createTask: (tasks: TaskDTO[]) => Promise<void>;
};

type TabRoutes = {
  Descrever: undefined;
  Investir: undefined;
  Validar: undefined;
};
export type AppNavigationTabRoutes = NativeStackNavigationProp<TabRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<TabRoutes>();

export function NewGoal({ createGoal, createTask }: NewTaskProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [goal, setGoal] = useState<GoalDTO>({
    id: uuid.v4().toString(),
    title: '',
    type: GoalsType.aquisicao,
    description: '',
    date: new Date(),
  });

  const [tasks, setTask] = useState<TaskDTO[]>([]);

  const handleAddTask = (task: TaskDTO) => {
    setTask([...tasks, task]);
  };

  const handleAddMultipleTasks = (newTasks: TaskDTO[]) => {
    setTask([...tasks, ...newTasks]);
  };

  const handleRemoveTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTask(newTasks);
  };

  const handleUpdateTask = (task: TaskDTO) => {
    const newTasks = tasks.map((item) => {
      if (item.id === task.id) {
        return task;
      }
      return item;
    });
    setTask(newTasks);
  };

  const handleOnChange = (value: string, field: string) => {
    setGoal({ ...goal, [field]: value });
  };

  const handleOnChangeDate = (date: Date) => {
    setGoal({ ...goal, date });
  };

  const handleOnSave = async () => {
    await createGoal(goal);
    await createTask(tasks);
    navigation.navigate('Home');
  };

  return (
    <VStack flex={1} bg="dark.shade">
      <GenericHeader type="goal" />
      <VStack flex={1} bg="dark.shade">
        <Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Screen name="Descrever">
            {() => <FormDiscovery goal={goal} onChange={handleOnChange} addTask={handleAddTask} />}
          </Screen>
          <Screen name="Investir">
            {() => (
              <FormInvest
                goal={goal}
                onChange={handleOnChangeDate}
                addTasks={handleAddMultipleTasks}
              />
            )}
          </Screen>
          <Screen name="Validar">
            {() => (
              <FormValidate
                goal={goal}
                tasks={tasks}
                updateTask={handleUpdateTask}
                removeTask={handleRemoveTask}
                save={handleOnSave}
              />
            )}
          </Screen>
        </Navigator>
      </VStack>
    </VStack>
  );
}
