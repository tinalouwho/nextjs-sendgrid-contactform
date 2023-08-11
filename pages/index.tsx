import React, { useState } from "react";
import { Inter } from "next/font/google";
import Input from "../components/Input";
import TextArea from "../components/Textarea";
import { validate } from "../utils/validate";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    const isError = Object.keys(validationErrors).length > 0;
    if (isError) {
      setErrors(validationErrors);
      setIsSubmitted(false);
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
      if (res.ok) {
        setValues({ name: "", email: "", message: "" });
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitted(false);
    }
  };

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      <h1 className="p-6 text-6xl font-bold">Get in touch</h1>
      <div className="px-3">
        {isSubmitted ? (
          <p className="text-green-600">I will be in touch soon!</p>
        ) : null}
        <form
          className="flex flex-col items-center w-full mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-4 row">
            <Input
              error={!!errors.name}
              errorMessage={errors.name}
              value={values.name}
              onChange={onChange}
              id="name"
              name="name"
              placeholder="Name"
              label="Your Name"
            />
            <Input
              error={!!errors.email}
              errorMessage={errors.email}
              value={values.email}
              onChange={onChange}
              id="email"
              name="email"
              placeholder="youremail@email.com"
              label="Your Email"
            />
          </div>
          <TextArea
            error={!!errors.message}
            errorMessage={errors.message}
            onChange={onChange}
            value={values.message}
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
