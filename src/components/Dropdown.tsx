import React, { useState } from "react";

interface DropdownProps {
  options: { value: string; label: string }[];
  selected: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  name,
  selected,
  onChange,
}) => {
  return (
    <select
      name={name}
      className="rounded px-1.5 py-1 w-20 dark:text-gray-300 dark:bg-gray-700 focus:outline-none dark:focus:shadow-outline-gray"
      value={selected}
      onChange={onChange}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
