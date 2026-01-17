import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TodoProvider } from "./context/TodoContext.tsx";
import "./index.css";

console.log("BUILD ID:", import.meta.env.MODE, Date.now());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </StrictMode>,
);
