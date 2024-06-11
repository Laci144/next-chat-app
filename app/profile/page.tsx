import { getServerSession } from "next-auth";
import Image from "next/image";
import React, { useEffect } from "react";
import { authOptions } from "../lib/auth";
import FormProfile from "../components/FormProfile";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex  flex-col items-center justify-center mt-32">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <FormProfile currentUserName={session?.user?.name as string} />

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
