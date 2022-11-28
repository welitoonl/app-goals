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
  updateGoal: (goal: GoalDTO) => Promise<void>;
  removeGoal: (goal: string) => Promise<void>;
  updateTask: (task: TaskDTO) => Promise<void>;
  removeTask: (task: string) => Promise<void>;
  fetchTasks: (title?: string) => Promise<void>;
  fetchGoals: () => Promise<void>;
  setSelectedGoal: (goal: GoalDTO) => void;
  setSelectedTask: (task: TaskDTO) => void;
};
export function Home({
  goals,
  tasks,
  name,
  updateGoal,
  updateTask,
  removeGoal,
  removeTask,
  fetchTasks,
  fetchGoals,
  setSelectedGoal,
  setSelectedTask,
}: HomeProps) {
  useEffect(() => {
    fetchGoals();
    fetchTasks();
  }, []);

  return (
    <VStack flex={1} bg="dark.shade">
      <HomeHeader name={name} />
      <Goals goals={goals} tasks={tasks} update={updateGoal} remove={removeGoal} />
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
