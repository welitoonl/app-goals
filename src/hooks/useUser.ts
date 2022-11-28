import { userCreate } from '@storage/user/createUser';
import { userGet } from '@storage/user/getUser';
import { userDTO } from '@storage/user/userDTO';
import { useState } from 'react';

export function useUser() {
  const [user, setUser] = useState<userDTO | null>(null);

  const fetchUser = async () => {
    const user = await userGet();
    setUser(user);
  };

  const createUser = async (newUser: userDTO) => {
    await userCreate(newUser);
    await fetchUser();
  };

  return { user, createUser, fetchUser };
}
