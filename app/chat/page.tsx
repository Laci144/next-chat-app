import { getServerSession } from "next-auth";
import React, { useEffect } from "react";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import Form from "../components/Form";
import prisma from "../lib/db";
import ChatComponent from "../components/Chat";

async function getData() {
  const data = await prisma.message.findMany({
    select: {
      message: true,
      id: true,
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 50, // only take the first 50 messages
  });

  return data;
}

async function updateData() {
  try {
    const user = await prisma.user.findFirst({
      where: { name: "Business Laci" },
    });
    console.log(user?.email, user?.id);
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name: "Updated value" },
      });
    }
  } catch (error) {
    console.error("Error updating user: ", error);
  }
}

export const dynamic = "force-dynamic"; // disable cache-ing

export default async function ChatHomePage() {
  const session = await getServerSession(authOptions);
  const data = await getData();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="h-screen bg-gray-200 flex flex-col">
      <ChatComponent data={data} />
      <button onClick={() => updateData()} className="bg-black">
        Update
      </button>
      <Form />
    </div>
  );
}
