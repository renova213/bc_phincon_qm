import ITodo from "./ITodo";
import ITodoPagination from "./ITodoPagination";

export default interface ITodoData {
  todos: ITodo[];
  pagination: ITodoPagination;
}

