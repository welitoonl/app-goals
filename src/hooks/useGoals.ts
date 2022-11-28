import { goalCreate } from '@storage/goals/goalCreate';
import { goalRemoveById } from '@storage/goals/goalRemoveByID';
import { GoalDTO } from '@storage/goals/goalStorageDTO';
import { goalUpdateById } from '@storage/goals/goalUpdateByID';
import { goalsGetAll } from '@storage/goals/goalsGetAll';
import { AppError } from '@utils/AppError';
import { useCallback, useState } from 'react';

export interface GoalsHook {
  goals: GoalDTO[];
  isLoading: boolean;
  error: string;
  fetchGoals: () => Promise<void>;
  createGoal: (newGoal: GoalDTO) => Promise<void>;
  updateGoal: (goal: GoalDTO) => Promise<void>;
  removeGoal: (id: string) => Promise<void>;
}

export function useGoals() {
  const [goals, setGoals] = useState<GoalDTO[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGoals = useCallback(async () => {
    try {
      setisLoading(true);
      const goals = await goalsGetAll();
      const newGoals = goals.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      setGoals(newGoals);
    } catch (error) {
      if (error instanceof AppError) {
        setError(error.message);
      } else {
        setError('Não foi possível carregar suas metas');
      }
    } finally {
      setisLoading(false);
    }
  }, []);

  const createGoal = useCallback(
    async (newGoal: GoalDTO) => {
      try {
        setisLoading(true);
        await goalCreate(newGoal);
        await fetchGoals();
      } catch (error) {
        if (error instanceof AppError) {
          setError(error.message);
        } else {
          setError('Não foi possível criar sua meta, tente novamente mais tarde');
        }
      } finally {
        setisLoading(false);
      }
    },
    [fetchGoals]
  );

  const updateGoal = useCallback(
    async (goalUpdated: GoalDTO) => {
      try {
        setisLoading(true);
        await goalUpdateById(goalUpdated);
        await fetchGoals();
      } catch (error) {
        if (error instanceof AppError) {
          setError(error.message);
        } else {
          setError('Não foi possível atualizar sua meta, tente novamente mais tarde');
        }
      } finally {
        setisLoading(false);
      }
    },
    [fetchGoals]
  );

  const removeGoal = useCallback(
    async (goalDeleted: string) => {
      try {
        setisLoading(true);
        await goalRemoveById(goalDeleted);
        await fetchGoals();
      } catch (error) {
        if (error instanceof AppError) {
          setError(error.message);
        } else {
          setError('Não foi possível remover sua meta, tente novamente mais tarde');
        }
      } finally {
        setisLoading(false);
      }
    },
    [fetchGoals]
  );

  return { goals, isLoading, error, fetchGoals, createGoal, updateGoal, removeGoal };
}
