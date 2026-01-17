import { createContext, useEffect, useReducer } from "react";
import type { Todo } from "../types";
import { initialState, todoReducer, type State } from "./todoReducer";

// 1. TYPE
type TodoContextType = {
  state: State;
  addTodo: (text: string) => void;
  deleteTodo: (id: Todo["id"]) => void;
  toggleTodo: (id: Todo["id"]) => void;
  updateTodo: (id: Todo["id"], newText: string) => void;
};

// 2. CONTEXT
export const TodoContext = createContext<TodoContextType | null>(null);

// 3. PROVIDER
export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // 3.1 Guardamos en el localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  // 3.2 Funciones
  const addTodo = (text: string) => {
    dispatch({ type: "ADD_TODO", payload: text });
  };

  const deleteTodo = (id: Todo["id"]) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const toggleTodo = (id: Todo["id"]) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const updateTodo = (id: Todo["id"], newText: string) => {
    dispatch({ type: "UPDATE_TODO", payload: { id, text: newText } });
  };

  return (
    <TodoContext.Provider
      value={{ state, addTodo, deleteTodo, toggleTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}
