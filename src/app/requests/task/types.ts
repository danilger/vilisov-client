export type Task = {
  id: number;
  title: string;
  description?: string | null;
  status: string;
};

export type CreateTask = Omit<Task, "id">;
