import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Todo } from "../contexts/TodoContext";
import TodoCard from "./TodoCard";

/**
 *
 * @param todos : A list of Todo
 * @returns JSX Element
 * A component to render a list of todos. This component uses Grid column (4 for large, 6 for medium, 12 as default).
 */
function Todolist({ todos }: { todos: Todo[] }) {
  return (
    <>
      {todos.map((todo) => (
        <Col xs={12} md={6} lg={4} key={todo.id}>
          <TodoCard todo={todo} />
        </Col>
      ))}
    </>
  );
}

export default Todolist;
