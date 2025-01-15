import React from "react";

export const FilterDropdown = ({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selectedOptions: string[]) => void;
}) => (
  <div className="relative flex flex-col">
    <label className="text-xs font-medium text-gray-600">{label}</label>
    <select
      multiple
      value={selected}
      onChange={(e) =>
        onChange(Array.from(e.target.selectedOptions, (option) => option.value))
      }
      className="w-full px-3 py-2 border rounded-md"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
