import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TodoContext = createContext<TodoContextProps | null>(null);

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  function addTodo(todo: Todo) {
    if (todos.find((x) => x.id == todo.id)) {
      throw new Error("Todo id is not unique");
    }
    setTodos((prevTodos) => [...prevTodos, todo]);
  }

  function removeTodo(id: string) {
    setTodos((prevTodos) => prevTodos.filter((x) => x.id !== id));
  }

  function toggleDone(id: string) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            date: new Date().toISOString().slice(0, 10),
            done: !todo.done,
          };
        } else {
          return todo;
        }
      })
    );
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggleDone }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);

export interface Todo {
  id: string;
  name: string;
  done: boolean;
  date: string;
}

export interface TodoContextProps {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (name: string) => void;
  toggleDone: (name: string) => void;
}

export default TodoProvider;
