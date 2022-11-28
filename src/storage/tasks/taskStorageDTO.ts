export interface TaskDTO {
  id: string;
  idGoal?: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  completed: boolean;
}
