import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { authOptions } from "../lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex  flex-col items-center justify-center mt-32">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="flex flex-col items-center mb-4">
        <p className="font-bold text-2xl mb-6">{session?.user?.name}</p>
        <div className="flex">
          <p className="flex items-center mr-4">Change username</p>
          <input
            type="text"
            id="username"
            placeholder="New username..."
            className="border border-gray-300 px-2 py-1 mr-4 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="mr-4">Profile picture</div>
        <Image
          src={session?.user?.image as string}
          className="w-20 h-20 rounded-full mt-4"
          height={50}
          width={50}
          alt="user image"
        />
      </div>
    </div>
  );
}
