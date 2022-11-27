import AsyncStorage from '@react-native-async-storage/async-storage';
import { TASKS_COLLECTION } from '@storage/storageConfig';

import { tasksGetAll } from './tasksGetAll';

export async function taskRemoveByGoal(goalId: string) {
  try {
    const storedTasks = await tasksGetAll();
    const tasks = storedTasks.filter((task) => task.idGoal !== goalId);

    await AsyncStorage.setItem(TASKS_COLLECTION, JSON.stringify(tasks));
  } catch (error) {
    throw error;
  }
}
