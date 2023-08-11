import emailValidator from "email-validator";

export const validate = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  const errors: { name?: string; email?: string; message?: string } = {};

  if (!name || name.trim() === "") {
    errors.name = "Name is required";
  }

  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!emailValidator.validate(email)) {
    errors.email = "Invalid email address";
  }

  if (!message || message.trim() === "") {
    errors.message = "Message is required";
  }

  return errors;
};
