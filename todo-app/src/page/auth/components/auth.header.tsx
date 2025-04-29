import React from "react";

interface AuthHeaderProps {
  isLogin: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isLogin }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-indigo-400">
        Todo<span className="text-teal-400">App</span>
      </h1>
      <p className="mt-2 text-gray-400">Stay organized and productive</p>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white text-center">
          {isLogin ? "Sign in to your account" : "Create your account"}
        </h2>
      </div>
    </div>
  );
};

export default AuthHeader;
