import { IGoal } from '@components/Goal';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { NewGoal } from '@screens/NewGoal';
import { NewTask } from '@screens/NewTask';

type Routes = {
  Home: undefined;
  NewGoal: { addGoal: (goal: IGoal) => void };
  NewTask: { addTask: (task: IGoal) => void };
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<Routes>;

const { Navigator, Group, Screen } = createNativeStackNavigator<Routes>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Home" component={Home} />
      <Screen name="NewGoal" component={NewGoal} />
      <Group
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
          contentStyle: {
            top: '55%',
            backgroundColor: 'transparent',
          },
        }}>
        <Screen name="NewTask">{(props) => <NewTask {...props} />}</Screen>
      </Group>
    </Navigator>
  );
}
