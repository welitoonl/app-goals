import { useGoals } from '@hooks/useGoals';
import { useTasks } from '@hooks/useTasks';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { NewGoal } from '@screens/NewGoal';
import { NewTask } from '@screens/NewTask';
import { GoalDTO } from '@storage/goals/goalStorageDTO';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { useState } from 'react';

type Routes = {
  Home: undefined;
  NewGoal: undefined;
  NewTask: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<Routes>;

const { Navigator, Group, Screen } = createNativeStackNavigator<Routes>();

export function AppRoutes() {
  const name = 'João';
  const { goals, fetchGoals, updateGoal, removeGoal, createGoal } = useGoals();
  const { tasks, fetchTasks, updateTask, removeTask, createTask } = useTasks();
  const [selectedGoal, setSelectedGoal] = useState<GoalDTO>();
  const [selectedTask, setSelectedTask] = useState<TaskDTO>();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Home">
        {() => (
          <Home
            name={name}
            goals={goals}
            tasks={tasks}
            updateGoal={updateGoal}
            removeGoal={removeGoal}
            updateTask={updateTask}
            removeTask={removeTask}
            fetchTasks={fetchTasks}
            fetchGoals={fetchGoals}
            setSelectedGoal={setSelectedGoal}
            setSelectedTask={setSelectedTask}
          />
        )}
      </Screen>
      <Screen name="NewGoal">
        {() => <NewGoal createGoal={createGoal} createTask={createTask} />}
      </Screen>

      <Group
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
          contentStyle: {
            top: '55%',
            backgroundColor: 'transparent',
          },
        }}>
        <Screen name="NewTask">
          {() => (
            <NewTask
              task={selectedTask}
              createTask={createTask}
              updateTask={updateTask}
              setSelectedTask={setSelectedTask}
            />
          )}
        </Screen>
      </Group>
    </Navigator>
  );
}
