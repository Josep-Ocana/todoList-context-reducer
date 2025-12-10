import { useState, type FormEvent } from "react";
import { useTodos } from "../context/useTodos";

const Form = () => {
  const { addTodo } = useTodos();

  const [inputValue, setInputValue] = useState<string>("");
  const [alerta, setAlerta] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue === "") {
      setAlerta("No puede estar el campo vacio");
      return;
    }
    setAlerta("");
    addTodo(inputValue.trim());
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-5">
      {alerta !== "" && (
        <div
          className="bg-red-500 text-white p-3 rounded text-center uppercase text-sm font-bold"
          role="alert"
        >
          {alerta}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="p-3 border rounded-lg w-full"
          aria-label="Nueva tarea"
          placeholder="Que necesitas hacer?"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className=" bg-cyan-800 hover:bg-cyan-900 text-white rounded-lg w-full sm:w-40 sm:ml-3 py-2">
          + Añadir
        </button>
      </div>
    </form>
  );
};

export default Form;
