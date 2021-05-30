import React from "react";
import { Button, Card } from "react-bootstrap";
import { Todo, TodoContextProps, useTodos } from "../contexts/TodoContext";

/**
 *
 * @param todo : TodoCardProps
 * @returns JSX Element
 * A todo card with option to delete or toggle done
 */
function TodoCard({ todo }: TodoCardProps) {
  const { removeTodo, toggleDone } = useTodos() as TodoContextProps;

  return (
    <div className="mb-4">
      <Card bg={todo.done ? "dark" : "primary"} text="white">
        <Card.Header className="lead">
          <strong>{todo.name}</strong>
        </Card.Header>
        <Card.Body>
          <p>Status: {todo.done ? "sudah dikerjakan" : "belum dikerjakan"} </p>
          <p>Dibuat pada: {todo.date}</p>
          <p>Id: {todo.id}</p>
        </Card.Body>
        <Card.Footer>
          <Button onClick={() => removeTodo(todo.id)} variant="danger">
            Delete
          </Button>
          <Button onClick={() => toggleDone(todo.id)} variant="warning">
            Toggle done
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

interface TodoCardProps {
  todo: Todo;
}

export default TodoCard;
