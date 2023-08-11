import React from "react";

interface TextAreaProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
}

export default function TextArea({
  id,
  name,
  label,
  placeholder,
  ...props
}: TextAreaProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-sm uppercase ">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={5}
        placeholder={placeholder}
        {...props}
        className="w-full text-black placeholder-gray-400 border-indigo-400 rounded-md focus:ring-2 focus:ring-purple-400 "
      ></textarea>
    </div>
  );
}
