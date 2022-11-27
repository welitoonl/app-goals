import AsyncStorage from '@react-native-async-storage/async-storage';
import { TASKS_COLLECTION } from '@storage/storageConfig';

import { TaskDTO } from './taskStorageDTO';
import { tasksGetAll } from './tasksGetAll';

export async function taskUpdateById(taskUpdated: TaskDTO) {
  try {
    const storedTasks = await tasksGetAll();
    const tasks = storedTasks.filter((task) => task.id !== taskUpdated.id);

    const newStorage = JSON.stringify([...tasks, taskUpdated]);
    await AsyncStorage.setItem(TASKS_COLLECTION, JSON.stringify(newStorage));
  } catch (error) {
    throw error;
  }
}
