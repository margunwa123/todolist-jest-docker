import React, { useMemo, useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { v4 } from "uuid";
import Todolist from "./components/Todolist";
import { TodoContextProps, useTodos } from "./contexts/TodoContext";

function App() {
  const [todoname, setTodoname] = useState<string>("");
  const { todos, addTodo } = useTodos() as TodoContextProps;
  const notDoneTodos = useMemo(
    () => todos.filter((todo) => todo.done == false),
    [todos]
  );
  const doneTodos = useMemo(
    () => todos.filter((todo) => todo.done == true),
    [todos]
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const todo = {
        id: v4(),
        name: todoname,
        done: false,
        date: new Date().toISOString().slice(0, 10),
      };
      addTodo(todo);
    } catch (err) {
      setAlertMessage(err.message);
      setShowAlert(true);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Todolist</h1>
        </div>
      </div>
      <Accordion className="my-2" defaultActiveKey="0">
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            style={{ cursor: "pointer" }}
            variant="link"
            eventKey="0"
          >
            Create Todo
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form className="" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nama Todo</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setTodoname(e.target.value);
                    }}
                    value={todoname}
                    type="text"
                    placeholder="Masukan nama todo"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Buat todo
                </Button>
                {showAlert && (
                  <Alert
                    variant="danger"
                    dismissible
                    onClose={() => setShowAlert(false)}
                  >
                    {alertMessage}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <h2>Not Done</h2>

      <Row>
        <Todolist todos={notDoneTodos} />
      </Row>
      <h2>Done</h2>
      <Row>
        <Todolist todos={doneTodos} />
      </Row>
    </div>
  );
}

export default App;
