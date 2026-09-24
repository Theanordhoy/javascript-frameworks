"use client";
import { useState } from "react";

// Kept to show how the formData object could be typed, but not used in this example since we don't send the data anywhere.
// interface ContactFormData {
//   name: string;
//   subject: string;
//   email: string;
//   message: string;
// }

export function ContactForm() {
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [subject, setSubject] = useState<string>("");
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messageError, setMessageError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  //Reusable function that creates an onChange handler for text input and updates the state setter you pass it to.
  const handleTextChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  //onChange handler for textarea
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setValidationError(null);
    setNameError(null);
    setSubjectError(null);
    setEmailError(null);
    setMessageError(null);

    if (!name.trim() || !subject.trim() || !email.trim() || !message.trim()) {
      setValidationError("Please fill in all required fields.");
      return;
    }

    if (name.length < 3) {
      setNameError("Name must be at least 3 characters.");
      return;
    }

    if (subject.length < 3) {
      setSubjectError("Subject must be at least 3 characters.");
      return;
    }

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address. Include '@'.");
      return;
    }

    if (message.length < 10) {
      setMessageError("Message must be at least 10 characters.");
      return;
    }

    // Kept to show how the formData object could be trimmed if the form was submitted to an API, but not used in this example since we don't send the data anywhere.
    // const formData: ContactFormData = {
    //   name: name.trim(),
    //   subject: subject.trim(),
    //   email: email.trim(),
    //   message: message.trim(),
    // };

    setSuccessMessage(
      "Thank you for your message, we will get back to you as soon as possible!"
    );

    setName("");
    setSubject("");
    setEmail("");
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl border border-gray-200 rounded-lg p-6 shadow-md mt-5"
    >
      <h2 className="text-2xl text-center font-bold my-5">Contact Us</h2>
      {successMessage && (
        <p className="text-center py-3 my-5 rounded-lg text-green-800 bg-green-100 border border-green-800 max-w-150 mx-auto">
          {successMessage}
        </p>
      )}
      {validationError && (
        <p className="text-center py-3 my-5 rounded-lg bg-red-100 text-red-800 border border-red-800 max-w-150 mx-auto">
          {validationError}
        </p>
      )}
      <div className="flex flex-col gap-4 mx-auto max-w-lg">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleTextChange(setName)}
            className="border border-gray-200 rounded-lg p-2 shadow-md"
          />
          {nameError && (
            <p className="text-red-800 border pl-2 border-red-800 bg-red-100 rounded-lg p-1 text-sm">
              {nameError}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="subject">Subject *</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={handleTextChange(setSubject)}
            className="border border-gray-200 rounded-lg p-2 shadow-md"
          />
          {subjectError && (
            <p className="text-red-800 border pl-2 border-red-800 bg-red-100 rounded-lg p-1 text-sm">
              {subjectError}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleTextChange(setEmail)}
            className="border border-gray-200 rounded-lg p-2 shadow-md"
          />
          {emailError && (
            <p className="text-red-800 border pl-2 border-red-800 bg-red-100 rounded-lg p-1 text-sm">
              {emailError}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            value={message}
            onChange={handleTextAreaChange}
            rows={8}
            className="border border-gray-200 rounded-lg p-2 shadow-md"
          />
          {messageError && (
            <p className="text-red-800 pl-2 border border-red-800 bg-red-100 rounded-lg p-1 text-sm">
              {messageError}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="border border-white bg-gray-800 hover:bg-black text-lg text-white font-semibold rounded-lg p-2 w-full my-5 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
