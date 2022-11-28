import { taskCreate } from '@storage/tasks/taskMultipleCreate';
import { taskRemoveById } from '@storage/tasks/taskRemoveByID';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { taskUpdateById } from '@storage/tasks/taskUpdateByID';
import { tasksGetAll } from '@storage/tasks/tasksGetAll';
import { AppError } from '@utils/AppError';
import { useCallback, useState } from 'react';

export interface TasksHook {
  tasks: TaskDTO[];
  isLoading: boolean;
  error: string;
  fetchTasks: () => Promise<void>;
  getTasksByGoalId: (goalId: string) => TaskDTO[];
  createTask: (newTask: TaskDTO) => Promise<void>;
  updateTask: (task: TaskDTO) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export function useTasks() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async (title?: string) => {
    try {
      setisLoading(true);
      const tasks = await tasksGetAll();
      const tasksFiltered = tasks.filter((item) => {
        const itemData = item.title.toUpperCase();
        const textData = title?.toUpperCase();
        return textData ? itemData.indexOf(textData) > -1 : true;
      });

      const tasksOrderedByDate = tasksFiltered.sort((a, b) => {
        return new Date(a.start).getTime() - new Date(b.start).getTime();
      });

      setTasks(tasksOrderedByDate);
    } catch (error) {
      if (error instanceof AppError) {
        setError(error.message);
      } else {
        setError('Não foi possível carregar suas tarefas');
      }
    } finally {
      setisLoading(false);
    }
  }, []);

  const getTasksByGoalId = (goalId: string) => {
    fetchTasks();
    const tasksFiltered = tasks.filter((item) => item.idGoal === goalId);
    return tasksFiltered;
  };

  const createTask = useCallback(
    async (newTasks: TaskDTO[]) => {
      try {
        setisLoading(true);
        await taskCreate(newTasks);
        await fetchTasks();
      } catch (error) {
        if (error instanceof AppError) {
          setError(error.message);
        } else {
          setError('Não foi possível criar sua tarefa, tente novamente mais tarde');
        }
      } finally {
        setisLoading(false);
      }
    },
    [fetchTasks]
  );

  const updateTask = useCallback(
    async (taskUpdated: TaskDTO) => {
      try {
        setisLoading(true);
        await taskUpdateById(taskUpdated);
        await fetchTasks();
      } catch (error) {
        if (error instanceof AppError) {
          setError(error.message);
        } else {
          setError('Não foi possível atualizar sua tarefa, tente novamente mais tarde');
        }
      } finally {
        setisLoading(false);
      }
    },
    [fetchTasks]
  );

  const removeTask = useCallback(
    async (taskDeleted: string) => {
      try {
        setisLoading(true);
        await taskRemoveById(taskDeleted);
        await fetchTasks();
      } catch (error) {
        if (error instanceof AppError) {
          setError(error.message);
        } else {
          setError('Não foi possível remover sua tarefa, tente novamente mais tarde');
        }
      } finally {
        setisLoading(false);
      }
    },
    [fetchTasks]
  );

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    getTasksByGoalId,
    createTask,
    updateTask,
    removeTask,
  };
}
