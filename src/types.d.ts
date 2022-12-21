export interface TaskType {
  id: string;
  title: string;
  done: boolean;
}

export interface ApiTasksList {
  [id:string]: TaskType;
}

export type TaskFormType = Omit<TaskType, 'id'>;