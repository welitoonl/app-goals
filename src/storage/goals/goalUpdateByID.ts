import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOALS_COLLECTION } from '@storage/storageConfig';

import { GoalDTO } from './goalStorageDTO';
import { goalsGetAll } from './goalsGetAll';

export async function goalUpdateById(goalUpdated: GoalDTO) {
  try {
    const storedGoals = await goalsGetAll();
    const goals = storedGoals.filter((goal) => goal.id !== goalUpdated.id);

    const newStorage = JSON.stringify([...goals, goalUpdated]);
    await AsyncStorage.setItem(GOALS_COLLECTION, JSON.stringify(newStorage));
  } catch (error) {
    throw error;
  }
}
