import AsyncStorage from '@react-native-async-storage/async-storage';
import { TASKS_COLLECTION } from '@storage/storageConfig';

import { TaskDTO } from './taskStorageDTO';
import { tasksGetAll } from './tasksGetAll';

export async function taskCreate(newTask: TaskDTO) {
  try {
    const storedTasks = await tasksGetAll();

    if (storedTasks.find((task) => task.id === newTask.id)) {
      throw new Error('Essa tarefa já existe');
    }

    const newStorage = JSON.stringify([...storedTasks, newTask]);
    await AsyncStorage.setItem(TASKS_COLLECTION, newStorage);
  } catch (error) {
    throw error;
  }
}
