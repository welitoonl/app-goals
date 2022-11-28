import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_COLLECTION } from '@storage/storageConfig';

import { userDTO } from './userDTO';

export async function userCreate(user: userDTO) {
  try {
    const newStorage = JSON.stringify(user);
    await AsyncStorage.setItem(USER_COLLECTION, newStorage);
  } catch (error) {
    throw error;
  }
}
