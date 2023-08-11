import React, { useState } from "react";
import { Inter } from "next/font/google";
import Input from "../components/Input";
import TextArea from "../components/Textarea";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [values, setVaules] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(values);
    const isError = Object.keys(errors).length;
    if (isError && isError > 0) {
      setErrors(errors);
      return;
    }
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        setVaules({ name: "", message: "", email: "" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      <h1 className="p-6 text-6xl font-bold">Get in touch</h1>
      <div className="px-3">
        <form className="flex flex-col items-center w-full mx-auto">
          <div className="flex gap-4 row">
            <Input id="name" name="name" placeholder="Name" label="Your Name" />
            <Input
              id="email"
              name="email"
              placeholder="youremail@email.com"
              label="Your Email"
            />
          </div>
          <TextArea
            id="message"
            name="message"
            placeholder="Write something here..."
            label="Your Message"
          />
          <button
            type="submit"
            className="w-full p-2 m-4 text-white bg-purple-800 rounded-md hover:bg-purple-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
