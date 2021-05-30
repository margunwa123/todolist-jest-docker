import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("check todolist", () => {
  render(<App />);
  const linkElement = screen.getByText(/Todolist/i);
  expect(linkElement).toBeInTheDocument();
});
