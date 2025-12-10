import type { Todo } from "../types";

export const useTodoStats = (todos: Todo[]) => {
  const { total, completed, pending } = todos.reduce(
    (
      acc: { total: number; completed: number; pending: number },
      todo: { completed: any }
    ) => {
      acc.total += 1;
      if (todo.completed) acc.completed += 1;
      else acc.pending += 1;
      return acc;
    },
    { total: 0, completed: 0, pending: 0 }
  );
  return { total, completed, pending };
};
