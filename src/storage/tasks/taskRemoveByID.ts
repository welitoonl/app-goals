import AsyncStorage from '@react-native-async-storage/async-storage';
import { TASKS_COLLECTION } from '@storage/storageConfig';

import { tasksGetAll } from './tasksGetAll';

export async function taskRemoveById(taskDeleted: string) {
  try {
    const storedTasks = await tasksGetAll();

    const newStorage = storedTasks.filter((task) => task.id !== taskDeleted);

    await AsyncStorage.setItem(TASKS_COLLECTION, JSON.stringify(newStorage));
  } catch (error) {
    throw error;
  }
}
