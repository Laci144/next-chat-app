import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import ChatComponent from "../components/Chat";
import FormChat from "../components/FormChat";

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
      <FormChat />
    </div>
  );
}
