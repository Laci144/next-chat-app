"use client";

import React from "react";
import { updateData } from "../action";

export default function FormProfile({
  currentUserName,
}: {
  currentUserName: string;
}) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.currentTarget);

    try {
      await updateData(formData);
      window.location.reload(); // Reload the page after successful form submission
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mb-4">
      <div>
        <p className="font-bold text-2xl mb-6">{currentUserName}</p>
      </div>

      <div className="flex">
        <p className="flex items-center mr-4">Change username</p>
        <input
          type="text"
          name="username"
          placeholder="New username..."
          required
          className="border border-gray-300 px-2 py-1 mr-4 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
