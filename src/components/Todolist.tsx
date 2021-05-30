import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Todo } from "../contexts/TodoContext";
import TodoCard from "./TodoCard";

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
