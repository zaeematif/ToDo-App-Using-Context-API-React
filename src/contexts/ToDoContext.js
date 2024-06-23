import React from "react";
import { useContext } from "react";

export const ToDoContext = React.createContext({
    todos: [
        {
            id: 1,
            todo: "To Do Task",
            completed: false
        }
    ],
    addToDo: (todo) => {},
    updateToDo: (id, todo) => {},
    deleteToDo: (id) => {},
    toggleComplete: (id) => {}
});

export const ToDoProvider = ToDoContext.Provider ;

export default function useToDo() {
    return useContext(ToDoContext);
}