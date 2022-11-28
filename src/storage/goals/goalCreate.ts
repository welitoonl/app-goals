import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOALS_COLLECTION } from '@storage/storageConfig';

import { GoalDTO } from './goalStorageDTO';
import { goalsGetAll } from './goalsGetAll';

export async function goalCreate(newGoal: GoalDTO) {
  try {
    const storedGoals = await goalsGetAll();

    const newStorage = JSON.stringify([...storedGoals, newGoal]);
    await AsyncStorage.setItem(GOALS_COLLECTION, newStorage);
  } catch (error) {
    throw error;
  }
}
