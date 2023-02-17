import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ id, name, value, error, onChange }) => {
  return (
    <input
      className={`rounded px-1.5 py-0.5 w-16 dark:text-gray-300 dark:bg-gray-700 focus:outline-none dark:focus:shadow-outline-gray ${
        error ? "border border-red-500" : ""
      }`}
      type="text"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
};

export default Input;
