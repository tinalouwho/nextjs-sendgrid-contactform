import React from "react";

interface InputProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
}

export default function Input({
  id,
  name,
  label,
  placeholder,
  ...props
}: InputProps) {
  return (
    <div className="w-full my-3">
      <label htmlFor={id} className="text-sm uppercase ">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        {...props}
        className="w-full text-black placeholder-gray-400 border-indigo-400 rounded-md focus:ring-2 focus:ring-purple-400 "
      ></input>
    </div>
  );
}
