import Footer from "./components/Footer";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Form from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className=" flex-grow w-full md:w-4/5 lg:w-3/5 mx-auto p-5 space-y-10">
          <Form />
          <Stats />
          <TodoList />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
