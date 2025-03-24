import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Dayjs } from 'dayjs';
import { RefObject } from 'react';


type Todo = {
  description: string;
  date: Dayjs | null;
  priority: string;
  id: number;
}

type TodoTableProps = {
  todos: Todo[];
  removeTodo: () => void;
  columnDefs: ColDef<Todo>[];
  gridRef: RefObject<AgGridReact<Todo> | null>;
  removeAllTodos: () => void;
}

export type {
  Todo,
  TodoTableProps
};