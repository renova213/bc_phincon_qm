import Layout from "./components/layout";
import AddTodo from "./components/add.todo";
import TodoList from "./components/todo.list";

const TodoPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Task Management
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <AddTodo />
          </div>
          <div className="lg:col-span-2">
            <TodoList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TodoPage;
