import { useTodos } from "../context/useTodos";
import { useTodoStats } from "../hooks/useTodoStats";

const Footer = () => {
  const { todos } = useTodos();

  const { total, completed, pending } = useTodoStats(todos);

  return (
    <footer className="flex flex-col sm:flex-row justify-between bg-cyan-900 text-white p-8 text-center text-sm mt-auto">
      {/* Sección de estadisticas */}
      <div className="sm:text-left pb-5 sm:p-0">
        <p>Tareas Totales: {total}</p>
        <p>Tareas Completadas: {completed}</p>
        <p>Tareas Pendientes: {pending}</p>
      </div>

      <div className="sm:text-right">
        <p>
          &copy; {new Date().getFullYear()} **Todo List App** . Todos los
          derechos reservados.
        </p>
        <p className="mt-1">
          Desarrollado por:
          <a
            target="_blank"
            href="https://github.com/Josep-Ocana"
            className="text-cyan-200 hover:underline transition duration-300 ml-1"
          >
            Josep Ocaña Puigdevall
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
