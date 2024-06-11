"use server";

import nextAuth, { getServerSession } from "next-auth";
import prisma from "./lib/db";
import { authOptions } from "./lib/auth";

const Pusher = require("pusher"); //The code const Pusher = require("pusher"); is importing the Pusher library into a JavaScript or Node.js application

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

export async function postData(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  const userMessage = formData.get("message");

  const data = await prisma.message.create({
    data: {
      message: userMessage as string,
      email: session?.user?.email as string,
    },
    include: {
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  await pusher.trigger("chat", "hello", {
    // await nélkül nem várja meg a lambda function, megáll mielőtt elérnél a trigger-t
    message: `${JSON.stringify(data)}\n\n`,
  });
}

export async function updateData(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const newUsername = formData.get("username") as string;

  const user = await prisma.user.findFirst({
    where: { name: session?.user?.name },
    select: {
      name: true,
      id: true,
    },
  });
  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: { name: newUsername },
    });
  }
}
