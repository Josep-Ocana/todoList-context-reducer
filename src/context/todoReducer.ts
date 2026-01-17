import type { Todo } from "../types";

export type State = {
  todos: Todo[];
};

export const initialState: State = {
  todos: [],
};

export type Action =
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: Todo["id"] }
  | { type: "TOGGLE_TODO"; payload: Todo["id"] }
  | { type: "UPDATE_TODO"; payload: { id: Todo["id"]; text: string } };

export function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };

    case "ADD_TODO":
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      return { ...state, todos: [...state.todos, newTodo] };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };

    default:
      return state;
  }
}
