import { useGoals } from '@hooks/useGoals';
import { useTasks } from '@hooks/useTasks';
import { useUser } from '@hooks/useUser';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { Login } from '@screens/Login';
import { NewGoal } from '@screens/NewGoal';
import { NewTask } from '@screens/NewTask';
import { GoalDTO } from '@storage/goals/goalStorageDTO';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { useState } from 'react';

type Routes = {
  Login: undefined;
  Home: undefined;
  NewGoal: undefined;
  NewTask: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<Routes>;

const { Navigator, Group, Screen } = createNativeStackNavigator<Routes>();

export function AppRoutes() {
  const [user, setUser] = useState('');
  const { goals, fetchGoals, removeGoal, createGoal } = useGoals();
  const { tasks, fetchTasks, updateTask, removeTask, createTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState<TaskDTO>();

  const setEmptySelectedTask = () => {
    setSelectedTask(undefined);
  };

  return (
    <Navigator
      initialRouteName={user.length > 0 ? 'Home' : 'Login'}
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Login">{() => <Login setUser={setUser} user={user} />}</Screen>
      <Screen name="Home">
        {() => (
          <Home
            name={user}
            goals={goals}
            tasks={tasks}
            removeGoal={removeGoal}
            updateTask={updateTask}
            removeTask={removeTask}
            fetchTasks={fetchTasks}
            fetchGoals={fetchGoals}
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
              setEmptySelectedTask={setEmptySelectedTask}
            />
          )}
        </Screen>
      </Group>
    </Navigator>
  );
}
