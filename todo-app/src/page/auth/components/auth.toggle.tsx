import React from "react";

interface AuthToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ isLogin, onToggle }) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-400">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={onToggle}
          className="ml-1 font-medium text-indigo-400 hover:text-indigo-300"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
};

export default AuthToggle;
