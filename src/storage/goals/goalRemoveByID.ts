import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOALS_COLLECTION } from '@storage/storageConfig';
import { taskRemoveByGoal } from '@storage/tasks/taskRemoveByGoal';

import { goalsGetAll } from './goalsGetAll';

export async function goalRemoveById(goalDeleted: string) {
  try {
    const storedGoals = await goalsGetAll();

    const newStorage = storedGoals.filter((goal) => goal.id !== goalDeleted);

    await AsyncStorage.setItem(GOALS_COLLECTION, JSON.stringify(newStorage));
    await taskRemoveByGoal(goalDeleted);
  } catch (error) {
    throw error;
  }
}
