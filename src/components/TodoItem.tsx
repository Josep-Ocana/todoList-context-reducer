import { useState } from "react";
import { useTodos } from "../context/useTodos";
import CancelIcon from "../icons/cancel.svg";
import DeleteIcon from "../icons/delete.svg";
import EditIcon from "../icons/edit.svg";
import SaveIcon from "../icons/save.svg";
import type { Todo } from "../types";

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    updateTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-1">
      <button
        onClick={() => toggleTodo(todo.id)}
        aria-label="Marcar tarea como completada o pendiente"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill={todo.completed ? "#3AE019" : "#BCBFBB"}
        >
          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      </button>
      {isEditing ? (
        <>
          <input
            type="text"
            className="mr-auto ml-3 border rounded-lg w-full m-1 p-2"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <button
            className="ml-2"
            onClick={() => handleSave()}
            aria-label="Guardar cambios"
          >
            <img src={SaveIcon} alt="Icono de Guardar" />
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="text-red-500 p-2 uppercase font-bold"
            aria-label="Cancelar edición"
          >
            <img src={CancelIcon} alt="Icono de Cancelar" />
          </button>
        </>
      ) : (
        <>
          <p
            aria-label={
              todo.completed
                ? "Tarea completada: " + todo.text
                : "Tarea pendiente: " + todo.text
            }
            className={`mr-auto p-3 ${
              todo.completed ? "line-through text-gray-400" : ""
            } `}
          >
            {todo.text}
          </p>
          <button onClick={() => setIsEditing(true)} aria-label="Editar tarea">
            <img src={EditIcon} alt="Icono de Editar" />
          </button>

          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 p-2 uppercase font-bold"
            aria-label="Eliminar tarea"
          >
            <img src={DeleteIcon} alt="Icono de Eliminar" />
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
