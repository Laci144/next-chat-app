import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default async function ProfilePage() {
  const session = await getSession();

  return (
    <div className="flex  flex-col items-center justify-center mt-32">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      <div className="flex items-center mb-4">
        <label htmlFor="username" className="mr-2">
          Username: {session?.user?.name}
        </label>
        <input
          type="text"
          id="username"
          placeholder="type..."
          className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex items-center mb-4">
        <div className="mr-2">Profile picture</div>
        <Image
          src={session?.user?.image as string}
          height={50}
          width={50}
          alt="user image"
        />
      </div>
    </div>
  );
}
