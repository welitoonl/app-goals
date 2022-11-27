import { IGoal } from '@components/Goal';
import { Goals } from '@components/Goals';
import { HomeHeader } from '@components/HomeHeader';
import { MenuFab } from '@components/Menu';
import { ITask } from '@components/Task';
import { Tasks } from '@components/Tasks';
import { VStack } from 'native-base';
import React from 'react';

export function Home() {
  const goals: IGoal[] = [
    {
      id: 1,
      title: 'Ler o livro "O Poder do Hábito"',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl auctor.',
      tasks: [
        {
          id: 1,
          title: 'Ler 20 páginas do livro',
          date: '2022-11-25',
          hour: '18:00',
          completed: true,
        },
        {
          id: 2,
          title: 'Ler 20 páginas do livro',
          date: '2022-11-24',
          hour: '18:00',
          completed: false,
        },
        {
          id: 3,
          title: 'Ler 20 páginas do livro',
          date: '2022-11-26',
          hour: '18:00',
          completed: false,
        },
      ],
      date: '25-12-2022',
    },
    {
      id: 2,
      title: 'Emagrecer 10kg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl auctor.',
      tasks: [
        {
          id: 4,
          title: 'Fazer 30 minutos de exercícios',
          date: '2022-11-25',
          hour: '15:00',
          completed: false,
        },
        {
          id: 5,
          title: 'Fazer 30 minutos de exercícios',
          date: '2022-11-26',
          hour: '15:00',
          completed: false,
        },
        {
          id: 6,
          title: 'Fazer 30 minutos de exercícios',
          date: '2022-11-24',
          hour: '15:00',
          completed: false,
        },
        {
          id: 7,
          title: 'Tomar 1 litro de água',
          date: '2022-11-25',
          hour: '12:00',
          completed: true,
        },
        {
          id: 8,
          title: 'Tomar 1 litro de água',
          date: '2022-11-25',
          hour: '22:00',
          completed: false,
        },
      ],
      date: '25-12-2022',
    },
    {
      id: 3,
      title: 'Estudar React Native',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl auctor.',
      tasks: [
        {
          id: 9,
          title: 'Fazer 30 minutos de exercícios',
          date: '2022-11-25',
          hour: '15:10',
          completed: false,
        },
        {
          id: 10,
          title: 'Fazer 30 minutos de exercícios',
          date: '2022-11-26',
          hour: '15:50',
          completed: true,
        },
        {
          id: 11,
          title:
            'Fazer 30 minutos de exercícios Fazer 30 minutos de exercícios Fazer 30 minutos de exercícios Fazer 30 minutos de exercícios',
          date: '2022-11-24',
          hour: '15:40',
          completed: false,
        },
        {
          id: 12,
          title: 'Tomar 1 litro de água fdfd eqtqfq',
          date: '2022-11-25',
          hour: '12:10',
          completed: false,
        },
        {
          id: 13,
          title: 'Tomar 1 litro de água',
          date: '2022-11-25',
          hour: '22:30',
          completed: false,
        },
      ],
      date: '25-12-2022',
    },
  ];
  const name = 'João';
  const [goalList, setGoal] = React.useState(goals);
  const [taskList, setTask] = React.useState(goalList.map((goal) => goal.tasks).flat());

  const handleAddGoal = (goal: IGoal) => {
    setGoal([...goalList, goal]);
  };

  const handleAddTask = (task: ITask) => {
    setTask([...taskList, task]);
  };

  const handleCompleteTask = (id: number) => {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTask(newTaskList);
  };

  return (
    <VStack flex={1} bg="dark.shade">
      <HomeHeader name={name} />
      <Goals goals={goals} />
      <Tasks tasks={taskList} checkTask={handleCompleteTask} />
      <MenuFab addGoal={handleAddGoal} addTask={handleAddTask} />
    </VStack>
  );
}
