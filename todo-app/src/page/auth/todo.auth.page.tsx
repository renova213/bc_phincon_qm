import React, { useState } from "react";
import AuthHeader from "./components/auth.header";
import AuthMessage from "./components/auth.message";
import AuthForm from "./components/auth.form";
import AuthToggle from "./components/auth.toggle";
import { useNavigate } from "react-router-dom";

const TodoAuthPages: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      setMessage(`Welcome back! Logged in as ${email}`);

      setTimeout(() => {
        navigate("/todo");
      }, 2000);
    } else {
      setMessage(`Account created successfully for ${username}!`);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setMessage("");
    }, 3000);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setUsername("");
    setMessage("");
    setIsSubmitted(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <AuthHeader isLogin={isLogin} />
        <AuthMessage isSubmitted={isSubmitted} message={message} />
        <AuthForm
          isLogin={isLogin}
          email={email}
          password={password}
          username={username}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onUsernameChange={setUsername}
          onSubmit={handleSubmit}
        />
        <AuthToggle isLogin={isLogin} onToggle={toggleForm} />
      </div>
    </div>
  );
};

export default TodoAuthPages;
