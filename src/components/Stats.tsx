import { useTodos } from "../context/useTodos";
import { useTodoStats } from "../hooks/useTodoStats";

const Stats = () => {
  const { todos } = useTodos();
  const { total, completed, pending } = useTodoStats(todos);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white shadow-lg  rounded-lg p-5 text-gray-700 gap sm:gap-0">
      <p className="flex justify-between sm:block sm:flex-grow sm:text-center ">
        <span>Total: </span>
        <span>{total}</span>
      </p>

      <p className="flex justify-between sm:block sm:flex-grow sm:text-center">
        <span>Completadas: </span>
        <span>{completed}</span>
      </p>

      <p className="flex justify-between sm:block sm:flex-grow sm:text-center">
        <span className="">Pendientes: </span>
        <span className="">{pending}</span>
      </p>
    </div>
  );
};

export default Stats;
