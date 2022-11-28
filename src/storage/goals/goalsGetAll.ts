import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOALS_COLLECTION } from '@storage/storageConfig';

import { GoalDTO } from './goalStorageDTO';

export async function goalsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(GOALS_COLLECTION);

    const goals: GoalDTO[] = storage ? JSON.parse(storage) : [];
    return goals;
  } catch (error) {
    throw error;
  }
}
