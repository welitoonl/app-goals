export enum GoalsType {
  aquisicao = 'aquisicao',
}

export interface GoalDTO {
  id: string;
  type: GoalsType;
  title: string;
  description: string;
  date: Date;
}
