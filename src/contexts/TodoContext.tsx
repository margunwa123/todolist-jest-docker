import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TodoContext = createContext<TodoContextProps | null>(null);

/**
 * A class for representating an error in a todolist app
 */
class TodoError extends Error {
  /**
   * Constructor for todo error
   * @constructor
   * @param message - the error message
   */
  constructor(message: string) {
    super(message);
  }
}

/**
 * A provider for todo context. Use this component as a parent component before a component start using useTodos
 * @param {React.ReactNode} children
 * @returns {React.Context<TodoContextProps|null>.Provider}
 */
function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  /**
   * @param todo - a todo
   * @throws {@link TodoError}
   * add todo into the list. Throw exception if it is not unique
   */
  function addTodo(todo: Todo) {
    if (todos.find((x) => x.id === todo.id)) {
      throw new TodoError("Todo id is not unique");
    }
    setTodos((prevTodos) => [...prevTodos, todo]);
  }

  /**
   * Remove a todo that has id from the list. Does nothing if the todo doesn't exist.
   * @param id - the todo id
   */
  function removeTodo(id: string) {
    setTodos((prevTodos) => prevTodos.filter((x) => x.id !== id));
  }

  /**
   * @param id - the todo id
   * Toggle a todo that has id
   */
  function toggleDone(id: string) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
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

/**
 * Simple hook that is used for manipulating todos
 * @returns {TodoContextProps | null} - if Provider is not present at top level, will return null
 */
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
