import { createContext, useEffect, useReducer } from "react";
import { supabase } from "../lib/superbase";
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

  // 3.1 Guardamos en Supabase
  useEffect(() => {
    const loadTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error loading todos:", error);
        return;
      }

      dispatch({ type: "SET_TODOS", payload: data ?? [] });
    };

    loadTodos();
  }, []);

  // 3.2 Funciones
  const addTodo = async (text: string) => {
    // Insertar en Supabase
    const { data, error } = await supabase
      .from("todos")
      .insert([{ text, completed: false }])
      .select()
      .single();

    if (error) {
      console.error(`Error adding todo: ${error.message}`);
      return;
    }

    // Dispatch al reducer con el todo real
    dispatch({ type: "ADD_TODO", payload: data });
  };

  const deleteTodo = async (id: Todo["id"]) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting todo: ${error.message}`);
      return;
    }

    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const toggleTodo = async (id: Todo["id"]) => {
    // 1. Obtenemos el todo actual
    const todo = state.todos.find((t) => t.id === id);
    if (!todo) return;

    // Actualizamos el campo 'completed' en Supabase
    const { data, error } = await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error toggling todo: ${error.message}`);
      return;
    }

    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const updateTodo = async (id: Todo["id"], newText: string) => {
    // 1. Obtenemos el todo actual
    const todo = state.todos.find((t) => t.id === id);
    if (!todo) return;

    // Actualizamos el campo texto en Supabase
    const { data, error } = await supabase
      .from("todos")
      .update({ text: newText })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating todo: ${error.message}`);
      return;
    }

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
