import React from "react";

interface AuthMessageProps {
  isSubmitted: boolean;
  message: string;
}

const AuthMessage: React.FC<AuthMessageProps> = ({ isSubmitted, message }) => {
  if (!isSubmitted || !message) return null;

  return (
    <div className="p-4 mb-4 text-sm text-center rounded-md bg-green-800 text-green-200">
      {message}
    </div>
  );
};

export default AuthMessage;
