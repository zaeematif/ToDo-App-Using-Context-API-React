import React, { useState } from "react";
import useToDo from "../contexts/ToDoContext";

function TodoForm() {

    //individual ToDo
    const [toDo, setToDo] = useState('');

    const { addToDo } = useToDo();

    const add = (e) => {
        e.preventDefault();

        if(toDo){
            addToDo(toDo);
            setToDo("");
        } else{
            return;
        }
    }

  return (
    <form className="flex my-6" onSubmit={add}>
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 py-3 outline-none duration-150 text-black"
        value={toDo}
        onChange={(e) => setToDo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
