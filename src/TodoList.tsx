import { useState, useRef, useEffect } from "react";
import { Todo } from "./types";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from 'ag-grid-community';
import exampelData from "./data";
import TodoTable from "./TodoTable";
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
  const gridRef = useRef<AgGridReact<Todo>>(null);

  const [todo, setTodo] = useState<Todo>({ description: '', date: null, priority: '', id: 0 });
  const [todos, setTodos] = useState<Todo[]>([]);

  // Columnd definitions for AG Grid
  const [columnDefs] = useState<ColDef<Todo>[]>([
    {
      field: "description",
      sortable: false,
      filter: true,
      floatingFilter: true,
      flex: 1
    },
    {
      field: "priority",
      filter: true,
      floatingFilter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
      flex: 1
    },
    {
      field: "date",
      filter: true,
      floatingFilter: true,
      flex: 1,
      cellRenderer: (data: { value: string | number | Date; }) => {
        return data.value ? (new Date(data.value)).toLocaleDateString() : '';
      }
    }
  ]);

  // Sets id correctly if example data is used and todos is not empty
  useEffect(() => {
    if (todos.length != 0) {
      setTodo({...todo, id: todos.length});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const addTodo = () => {
    if (todo.description === '') {
      alert("Please input description");
    } else if (todo.priority === '') {
      alert("Please select priority");
    } else if (todo.date === null) {
      alert("Please select date");
    } else {
      setTodos([...todos, todo]);
      setTodo({ ...todo, description: '', date: null, id: todo.id + 1, priority: '' });
    }
  };

  const handleDelete = () => {
    if (gridRef.current?.api.getSelectedNodes().length) {
      setTodos(todos.filter(
          (_todo, index) => index !== Number(gridRef.current?.api.getSelectedNodes()[0].id)
        )
      )
    } else {
      alert("Please select a row first");
    }
  }

  const handleDatePick = (date: Dayjs | null) => {
    setTodo({ ...todo, date: date});
  }

  const handleDeleteAll = () => {
    setTodos([]);
  }

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={2}>
        <TextField
          label="Description"
          onChange={(event) => setTodo({ ...todo, description: event.target.value })}
          value={todo.description}
          style={{width: "240px"}}
        />

        <FormControl style={{width: "160px"}}>
          <InputLabel id="todo-prio-select-label">Priority</InputLabel>
          <Select
            labelId="todo-prio-select-label"
            value={todo.priority}
            label="Priority"
            onChange={(event) => setTodo({ ...todo, priority: event.target.value })}
          >
            <MenuItem value={"High"} aria-label={"High"}>High</MenuItem>
            <MenuItem value={"Medium"} aria-label={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Low"} aria-label={"Low"}>Low</MenuItem>
          </Select>
        </FormControl>

        <DatePicker
          label="Date"
          format="YYYY-MM-DD"
          onChange={date => handleDatePick(date)}
          value={todo.date}
        />

        <Button onClick={addTodo} variant="contained">Add</Button>
      </Stack>

      <TodoTable
        todos={todos}
        removeTodo={handleDelete}
        columnDefs={columnDefs}
        gridRef={gridRef}
        removeAllTodos={handleDeleteAll}/>
    </>
  );
}

export default TodoList;
