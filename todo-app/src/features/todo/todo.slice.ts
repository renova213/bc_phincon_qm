import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import CreateTodoDto from "../../interfaces/ICreateTodoDto";
import Todo from "../../interfaces/ITodo";
import UpdateTodoDto from "../../interfaces/IUpdateTodoDto";
import todoService from "../../services/todo.service";

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Async Thunks
export const fetchTodos = createAsyncThunk(
  "todos/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await todoService.getAllTodos();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch todos";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todos/create",
  async (todoData: CreateTodoDto, thunkAPI) => {
    try {
      return await todoService.createTodo(todoData);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create todo";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  async (
    { id, todoData }: { id: string; todoData: UpdateTodoDto },
    thunkAPI
  ) => {
    try {
      return await todoService.updateTodo(id, todoData);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update todo";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTodoStatus = createAsyncThunk(
  "todos/update",
  async ({ id, todoStatus }: { id: string; todoStatus: string }, thunkAPI) => {
    try {
      return await todoService.updateTodoStatus(id, todoStatus);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update todo";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id: string, thunkAPI) => {
    try {
      await todoService.deleteTodo(id);
      return id;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete todo";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Create Todo
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Update Todo
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Delete Todo
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;
