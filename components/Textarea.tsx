import React from "react";
import { validate } from "../utils/validate";

interface TextAreaProps {
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

export default function TextArea({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  errorMessage = "",
  ...props
}: TextAreaProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-sm uppercase ">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        id={id}
        name={name}
        rows={5}
        placeholder={placeholder}
        {...props}
        className="w-full text-black placeholder-gray-400 border-indigo-400 rounded-md focus:ring-2 focus:ring-purple-400 "
      ></textarea>
      {error ? (
        <p className="text-sm italic text-red">*{errorMessage}</p>
      ) : null}
    </div>
  );
}
