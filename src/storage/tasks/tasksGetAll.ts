import AsyncStorage from '@react-native-async-storage/async-storage';
import { TASKS_COLLECTION } from '@storage/storageConfig';

import { TaskDTO } from './taskStorageDTO';

export async function tasksGetAll() {
  try {
    const storage = await AsyncStorage.getItem(TASKS_COLLECTION);

    const tasks: TaskDTO[] = storage ? JSON.parse(storage) : [];

    return tasks;
  } catch (error) {
    throw error;
  }
}
