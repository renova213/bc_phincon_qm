import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { fetchTodos, reset } from "../../../features/todo/todo.slice";
import TodoItem from "./todo.item";
import { TodoPriority, TodoStatus } from "../../../types/todo.types";

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, isLoading, isError, message } = useAppSelector(
    (state) => state.todos
  );

  // Expanded filters
  const [statusFilter, setStatusFilter] = useState<TodoStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TodoPriority | "all">(
    "all"
  );
  const [tagFilter, setTagFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [todosPerPage, _] = useState<number>(5);

  useEffect(() => {
    dispatch(fetchTodos());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, priorityFilter, tagFilter, searchTerm]);

  if (isLoading) {
    return <div className="text-center py-4">Loading todos...</div>;
  }

  if (isError) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded">
        Error: {message}
      </div>
    );
  }

  // Filter logic
  const filteredTodos = todos.filter((todo) => {
    // Status filter
    if (statusFilter !== "all" && todo.status !== statusFilter) {
      return false;
    }

    // Priority filter
    if (priorityFilter !== "all" && todo.priority !== priorityFilter) {
      return false;
    }

    // Tag filter
    if (
      tagFilter &&
      (!todo.tags ||
        !todo.tags.some((tag: string) =>
          tag.toLowerCase().includes(tagFilter.toLowerCase())
        ))
    ) {
      return false;
    }

    // Search filter (title and description)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        todo.title.toLowerCase().includes(searchLower) ||
        (todo.description &&
          todo.description.toLowerCase().includes(searchLower))
      );
    }

    return true;
  });

  // Sort by priority and due date
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    // First sort by priority
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    const priorityDiff =
      priorityOrder[a.priority as keyof typeof priorityOrder] -
      priorityOrder[b.priority as keyof typeof priorityOrder];

    if (priorityDiff !== 0) return priorityDiff;

    // Then sort by due date if both have one
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

    // Put todos with due dates before those without
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;

    // Finally sort by creation date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedTodos.length / todosPerPage);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = sortedTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Page change handler
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the list when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const pageNumbers: (number | string)[] = [];
  const pageWindow = 2; // Number of pages to show on each side of current page

  const renderPageNumbers = () => {
    // Always include first page
    if (currentPage > pageWindow + 1) {
      pageNumbers.push(1);
      if (currentPage > pageWindow + 2) {
        pageNumbers.push("ellipsis1");
      }
    }

    // Add pages around current page
    for (
      let i = Math.max(1, currentPage - pageWindow);
      i <= Math.min(totalPages, currentPage + pageWindow);
      i++
    ) {
      pageNumbers.push(i);
    }

    // Always include last page
    if (currentPage < totalPages - pageWindow) {
      if (currentPage < totalPages - pageWindow - 1) {
        pageNumbers.push("ellipsis2");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, index) => {
      if (number === "ellipsis1" || number === "ellipsis2") {
        return (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-1 text-gray-500 dark:text-gray-400"
          >
            ...
          </span>
        );
      }
      return (
        <button
          key={number}
          onClick={() => handlePageChange(number as number)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === number
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          }`}
        >
          {number}
        </button>
      );
    });
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Your Todos ({sortedTodos.length})
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-secondary"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as TodoStatus | "all")
                  }
                  className="w-full dark:bg-gray-600 dark:text-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  value={priorityFilter}
                  onChange={(e) =>
                    setPriorityFilter(e.target.value as TodoPriority | "all")
                  }
                  className="w-full dark:bg-gray-600 dark:text-white"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tag
                </label>
                <input
                  type="text"
                  placeholder="Filter by tag"
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="w-full dark:bg-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setPriorityFilter("all");
                  setTagFilter("");
                  setSearchTerm("");
                }}
                className="btn btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {sortedTodos.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {searchTerm ||
            statusFilter !== "all" ||
            priorityFilter !== "all" ||
            tagFilter
              ? "No todos match your filters."
              : "No todos yet. Add one to get started!"}
          </p>
        </div>
      ) : (
        <div>
          {/* Pagination settings at top */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {indexOfFirstTodo + 1}-
              {Math.min(indexOfLastTodo, sortedTodos.length)} of{" "}
              {sortedTodos.length} items
            </div>
          </div>

          {/* Todo items */}
          <div>
            {currentTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex items-center">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-l ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }`}
                >
                  First
                </button>

                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }`}
                >
                  &laquo;
                </button>

                {renderPageNumbers()}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }`}
                >
                  &raquo;
                </button>

                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-r ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }`}
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;
