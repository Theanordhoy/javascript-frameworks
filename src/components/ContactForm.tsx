"use client";
import { useState } from "react";

interface ContactFormData {
  name: string;
  subject: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [name, setName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
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

    if (!name.trim() || !subject.trim || !email.trim() || !message.trim()) {
      setValidationError("Please fill in all required fields.");
      return;
    }

    if (name.length && subject.length < 3) {
      setValidationError("Must be at least 3 characters.");
      return;
    }

    if (!email.includes("@")) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (message.length < 10) {
      setValidationError("Message must be at least 10 characters.");
      return;
    }

    const formData: ContactFormData = {
      name: name.trim(),
      subject: subject.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    console.log("Form submitted:", formData);
    setSuccessMessage(
      "Thank you for your message, we will get back to you as soon as possible!",
    );

    setName("");
    setSubject("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      {successMessage && <p>{successMessage}</p>}
      {validationError && <p>{validationError}</p>}
      <div>
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleTextChange(setName)}
        />
        <label htmlFor="subject">Subject *</label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={handleTextChange(setSubject)}
        />
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleTextChange(setEmail)}
        />
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          value={message}
          onChange={handleTextAreaChange}
          rows={8}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
