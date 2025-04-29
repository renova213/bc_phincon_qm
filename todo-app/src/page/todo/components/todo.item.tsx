import React, { useState } from "react";
import { TodoPriority, TodoStatus } from "../../../types/todo.types";
import { useAppDispatch } from "../../../redux/hooks";
import {
  updateTodo,
  deleteTodo,
  updateTodoStatus,
} from "../../../features/todo/todo.slice";
import Todo from "../../../interfaces/ITodo";
import UpdateTodoDto from "../../../interfaces/IUpdateTodoDto";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState<UpdateTodoDto>({
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    status: todo.status,
    priority: todo.priority,
    dueDate: todo.dueDate,
    tags: todo.tags,
  });
  const [tagInput, setTagInput] = useState("");

  const dispatch = useAppDispatch();
  const handleToggleComplete = () => {
    dispatch(
      updateTodoStatus({
        id: todo.id,
        todoStatus: todo.completed ? "in-progress" : "done",
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(
      updateTodo({
        id: todo.id,
        todoData: editedTodo,
      })
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTodo({
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      status: todo.status,
      priority: todo.priority,
      dueDate: todo.dueDate,
      tags: todo.tags,
    });
    setIsEditing(false);
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !editedTodo.tags?.includes(trimmedTag)) {
      setEditedTodo({
        ...editedTodo,
        tags: [...(editedTodo.tags || []), trimmedTag],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedTodo({
      ...editedTodo,
      tags: editedTodo.tags?.filter((tag) => tag !== tagToRemove) || [],
    });
  };

  // Helper function to get color based on priority
  const getPriorityColor = (priority: TodoPriority) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to get color based on status
  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case "to do":
        return "bg-gray-100 text-gray-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "done":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-300 text-gray-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to format due date
  const formatDueDate = (dateString?: string) => {
    if (!dateString) return null;

    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayDate = today.toDateString();
    const tomorrowDate = tomorrow.toDateString();
    const dueDate = date.toDateString();

    // Check if due date is past
    const isPast = date < today;

    if (dueDate === todayDate) {
      return <span className="text-orange-600 font-medium">Today</span>;
    } else if (dueDate === tomorrowDate) {
      return <span className="text-blue-600 font-medium">Tomorrow</span>;
    } else if (isPast) {
      return (
        <span className="text-red-600 font-medium">
          Overdue: {date.toLocaleDateString()}
        </span>
      );
    }

    return <span>{date.toLocaleDateString()}</span>;
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 border-l-4 ${
        todo.status === "done"
          ? "border-green-500"
          : todo.status === "in-progress"
          ? "border-blue-500"
          : todo.status === "archived"
          ? "border-gray-500"
          : "border-yellow-500"
      }`}
    >
      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={editedTodo.title || ""}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, title: e.target.value })
              }
              className="w-full dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={editedTodo.description || ""}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, description: e.target.value })
              }
              className="w-full resize-none dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={editedTodo.status}
                onChange={(e) =>
                  setEditedTodo({
                    ...editedTodo,
                    status: e.target.value as TodoStatus,
                    completed: e.target.value === "done",
                  })
                }
                className="w-full dark:bg-gray-700 dark:text-white"
              >
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
                value={editedTodo.priority}
                onChange={(e) =>
                  setEditedTodo({
                    ...editedTodo,
                    priority: e.target.value as TodoPriority,
                  })
                }
                className="w-full dark:bg-gray-700 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={editedTodo.dueDate || ""}
              onChange={(e) =>
                setEditedTodo({
                  ...editedTodo,
                  dueDate: e.target.value || undefined,
                })
              }
              className="w-full dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags
            </label>
            <div className="flex">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                className="flex-grow dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="ml-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md"
              >
                Add
              </button>
            </div>

            {editedTodo.tags && editedTodo.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {editedTodo.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-xs font-bold"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <button onClick={handleSave} className="btn btn-primary">
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3
              className={`text-lg font-semibold ${
                todo.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {todo.title}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={handleToggleComplete}
                className={`btn ${
                  todo.completed ? "btn-secondary" : "btn-primary"
                }`}
              >
                {todo.completed ? "Mark Undone" : "Mark Done"}
              </button>
              <button onClick={handleEdit} className="btn btn-secondary">
                Edit
              </button>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            <span
              className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                todo.status
              )}`}
            >
              {todo.status === "to do"
                ? "To Do"
                : todo.status === "in-progress"
                ? "In Progress"
                : todo.status === "done"
                ? "Done"
                : "Archived"}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                todo.priority
              )}`}
            >
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
            {todo.dueDate && (
              <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                Due: {formatDueDate(todo.dueDate)}
              </span>
            )}
          </div>

          {todo.tags && todo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {todo.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {todo.description && (
            <p
              className={`mt-2 text-gray-600 dark:text-gray-300 ${
                todo.completed
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : ""
              }`}
            >
              {todo.description}
            </p>
          )}

          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Created: {new Date(todo.createdAt).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
