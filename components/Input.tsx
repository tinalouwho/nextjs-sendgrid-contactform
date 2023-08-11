import React from "react";
import { validate } from "../utils/validate";

interface InputProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  error: boolean;
  errorMessage: string | undefined;
}

export default function Input({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  errorMessage = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full my-3">
      <label htmlFor={id} className="text-sm uppercase ">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        {...props}
        className="w-full text-black placeholder-gray-400 border-indigo-400 rounded-md focus:ring-2 focus:ring-purple-400 "
      />
      {error ? (
        <p className="text-sm italic text-red">*{errorMessage}</p>
      ) : null}
    </div>
  );
}
