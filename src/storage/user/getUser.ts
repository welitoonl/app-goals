import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_COLLECTION } from '@storage/storageConfig';

import { userDTO } from './userDTO';

export async function userGet() {
  try {
    const storage = await AsyncStorage.getItem(USER_COLLECTION);

    const user: userDTO = storage ? JSON.parse(storage) : '';
    return user;
  } catch (error) {
    throw error;
  }
}
