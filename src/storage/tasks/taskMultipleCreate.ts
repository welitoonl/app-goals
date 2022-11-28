import AsyncStorage from '@react-native-async-storage/async-storage';
import { TASKS_COLLECTION } from '@storage/storageConfig';

import { TaskDTO } from './taskStorageDTO';
import { tasksGetAll } from './tasksGetAll';

export async function taskCreate(newTasks: TaskDTO[]) {
  try {
    const storedTasks = await tasksGetAll();
    const newStorage = JSON.stringify([...storedTasks, ...newTasks]);
    await AsyncStorage.setItem(TASKS_COLLECTION, newStorage);
  } catch (error) {
    throw error;
  }
}
