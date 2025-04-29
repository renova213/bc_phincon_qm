import React from "react";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import TodoAuthPage from "./page/auth/todo.auth.page";
import TodoPage from "./page/todo/todo.page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/login" element={<TodoAuthPage />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" />
    </Provider>
  );
};

export default App;
