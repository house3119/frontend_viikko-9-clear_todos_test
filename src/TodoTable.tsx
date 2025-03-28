import { TodoTableProps } from "./types";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack";


const TodoTable = ({ todos, removeTodo, columnDefs, gridRef, removeAllTodos }: TodoTableProps) => {
  return (
    <div className="ag-theme-material ag-grid-custom">
      <AgGridReact
        columnDefs={columnDefs}
        ref={gridRef} 
        rowData={todos.map(todo => todo)}
        rowSelection="single"
        suppressColumnVirtualisation={true}
      />

      <Stack direction="row" spacing={2} justifyContent="left" alignItems="center" mt={2}>
        <Button onClick={removeTodo} variant="contained" color="error">
          Delete Selected
        </Button>
        <Button onClick={removeAllTodos} variant="contained" color="warning">
          Clear
        </Button>
      </Stack>
    </div>
  );
};

export default TodoTable;