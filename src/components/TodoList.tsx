import { useTodos } from "../context/useTodos";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todos } = useTodos();

  return (
    <div>
      {todos.length === 0 ? (
        <p className="bg-white shadow-lg rounded-lg p-5 text-lg text-center">
          {" "}
          No tienes ninguna{" "}
          <span className="text-cyan-700 font-black">Tarea</span>{" "}
        </p>
      ) : (
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};
export default TodoList;
