import React, { useState } from "react";
import useToDo from "../contexts/ToDoContext";


function TodoItem({ todo }) {
  const { updateToDo, deleteToDo, toggleComplete} = useToDo();

  const [isTodoEditable, setIsTodoEditable] = useState(false);

  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const editTodo = () => {
    updateToDo(todo.id, todoMsg);
    //make input read only again
    setIsTodoEditable(false);
  }

  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-3 gap-x-4 shadow-sm shadow-white/50 duration-300  text-black  ${
        todo.completed ? "bg-green-600" : "bg-[#ffffff]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-slate-600 hover:bg-slate-500 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-red-300 hover:bg-red-400 shrink-0"
        onClick={() => deleteToDo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
