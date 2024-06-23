import { useEffect, useState } from "react";
import { ToDoProvider } from "./contexts/ToDoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setToDos] = useState([]);

  //ADD NEW TO-DO
  const addToDo = (todo) => {
    const newToDo = {
      id: Date.now(),
      todo,
      completed: false,
    };

    //add new todo to ToDo Array
    setToDos((oldTodos) => [...oldTodos, newToDo]);
  };

  //UPDATE TO-DO
  const updateToDo = (id, todo) => {
    //update todos
    todos.forEach((prevTodo) => {
      if (prevTodo.id === id) {
        prevTodo.todo = todo;
      }
    });

    setToDos(todos);

    //in other way
    //setToDos((prev) => prev.map((prevToDo) => (prevToDo.id=== id ? todo : prevToDo)));
  };

  //DELETE TO-DO
  const deleteToDo = (id) => {
    //add new todo to ToDo Array
    setToDos((oldTodos) => oldTodos.filter((todo) => todo.id !== id));
  };

  //TOGGLE TO-DO
  const toggleComplete = (id) => {
    setToDos((oldTodos) =>
      oldTodos.map((prevToDo) =>
        prevToDo.id === id
          ? { ...prevToDo, completed: !prevToDo.completed } //toggle the completed toggle
          : prevToDo
      )
    );
  };

  //get all todos using Local-Storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setToDos(todos);
    }
  }, []);

  //insert all todos in HTML using Local-Storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <ToDoProvider
      value={{ todos, addToDo, updateToDo, deleteToDo, toggleComplete }}
    >
      <div className="bg-[#2E2E2E] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto bg-[#636363] shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3 mb-8">
            {todos.map((todo) => (
              <div key={todo.id}
              className="w-full"> 
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
