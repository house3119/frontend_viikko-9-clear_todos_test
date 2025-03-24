import App from "./App";
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';


test("Renders App component", () => {
  render(<App />);
  const header = screen.getByText(/My Todos/i);
  expect(header).toBeInTheDocument();
});


test("Renders the AG Grid container", () => {
  render(<App />);
  // Check that the grid container is rendered
  const gridContainer = screen.getByRole("grid");
  expect(gridContainer).toBeInTheDocument();
});


test("Add todo and then clear all todos", async () => {

  // Render App
  render(<App />);

  // Add description
  const desc = screen.getByLabelText("Description");
  fireEvent.change(desc, { target: { value: "Go to coffee" } });

  // Add date
  const date = screen.getByLabelText("Date");
  fireEvent.change(date, { target: { value: "2026-03-01" } });

  // Select priority
  const select = screen.getByLabelText('Priority');
  fireEvent.mouseDown(select);
  const option = screen.getAllByRole('option');
  fireEvent.click(option[0]);

  // Add todo
  const add = screen.getByText('Add');
  fireEvent.click(add);

  // Check for existence of added todo in the document
  const coffeeTodo = await screen.findByText("Go to coffee");
  expect(coffeeTodo).toBeInTheDocument();

  // Press clear button to remove all todos
  const clearBtn = screen.getByText('Clear');
  fireEvent.click(clearBtn);

  // Check that previous todo can't be found anymore
  const coffeeTodo2 = screen.queryByText("Go to coffee");
  expect(coffeeTodo2).toBeNull();
});