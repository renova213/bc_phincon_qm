import axios from "axios";
import ApiResponse from "../interfaces/IApiResponse";
import CreateTodoDto from "../interfaces/ICreateTodoDto";
import Todo from "../interfaces/ITodo";
import UpdateTodoDto from "../interfaces/IUpdateTodoDto";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const todoService = {

  getAllTodos: async (): Promise<Todo[]> => {
    const response = await axios.get<ApiResponse<Todo[]>>(`${API_URL}/todos`);
    return response.data.data || [];
  },
  getTodoById: async (id: string): Promise<Todo> => {
    const response = await axios.get<ApiResponse<Todo>>(
      `${API_URL}/todos/${id}`
    );
    if (!response.data) {
      throw new Error("Failed to get todo");
    }
    return response.data.data as Todo;
  },

  createTodo: async (todoData: CreateTodoDto): Promise<Todo> => {
    const response = await axios.post<ApiResponse<Todo>>(
      `${API_URL}/todos`,
      todoData
    );
    if (!response.data) {
      throw new Error("Failed to create todo");
    }
    return response.data.data as Todo;
  },

  updateTodo: async (id: string, todoData: UpdateTodoDto): Promise<Todo> => {
    const response = await axios.put<ApiResponse<Todo>>(
      `${API_URL}/todos/${id}`,
      todoData
    );
    if (!response.data) {
      throw new Error("Failed to update todo");
    }
    return response.data.data as Todo;
  },

  updateTodoStatus: async (id: string, status: string): Promise<Todo> => {
    const response = await axios.put<ApiResponse<Todo>>(
      `${API_URL}/todos/${id}/status`,
      { status }
    );
    if (!response.data) {
      throw new Error("Failed to update todo status");
    }
    return response.data.data as Todo;
  },

  deleteTodo: async (id: string): Promise<void> => {
    const response = await axios.delete<ApiResponse<null>>(
      `${API_URL}/todos/${id}`
    );
    if (!response.data) {
      throw new Error("Failed to delete todo");
    }
  },
};

export default todoService;
