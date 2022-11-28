import { Goals } from '@components/Goals';
import { HomeHeader } from '@components/HomeHeader';
import { MenuFab } from '@components/Menu';
import { Tasks } from '@components/Tasks';
import { GoalDTO } from '@storage/goals/goalStorageDTO';
import { TaskDTO } from '@storage/tasks/taskStorageDTO';
import { VStack } from 'native-base';
import { useEffect } from 'react';

export type HomeProps = {
  name: string;
  goals: GoalDTO[];
  tasks: TaskDTO[];
  removeGoal: (goal: string) => Promise<void>;
  updateTask: (task: TaskDTO) => Promise<void>;
  removeTask: (task: string) => Promise<void>;
  fetchTasks: (title?: string) => Promise<void>;
  fetchGoals: () => Promise<void>;
  setSelectedTask: (task: TaskDTO) => void;
};
export function Home({
  goals,
  tasks,
  name,
  updateTask,
  removeGoal,
  removeTask,
  fetchTasks,
  fetchGoals,
  setSelectedTask,
}: HomeProps) {
  useEffect(() => {
    fetchGoals();
    fetchTasks();
  }, []);

  const handleRemoveGoal = async (id: string) => {
    await removeGoal(id);
    await fetchTasks();
  };

  return (
    <VStack flex={1} bg="dark.shade">
      <HomeHeader name={name} />
      <Goals goals={goals} tasks={tasks} remove={handleRemoveGoal} />
      <Tasks
        tasks={tasks}
        update={updateTask}
        remove={removeTask}
        fetch={fetchTasks}
        selectTask={setSelectedTask}
      />
      <MenuFab />
    </VStack>
  );
}
