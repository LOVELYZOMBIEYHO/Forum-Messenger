import React from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Message } from "../typings";
// import { getSession } from "next-auth/react";
import Providers from "./providers";

// ---unstable_getServerSession
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
// ------

async function Homepage() {
  // ---Initial message but not work
  // const data = fetch(
  //   `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  // ).then((res) => res.json());

  // const messages: Message[] = data.messages;
  // ---Initial message but not work

  const messages: Message[] = [];

  const session = await unstable_getServerSession(authOptions);

  // const session = getSession();
  // console.log("session ServerSide", session);

  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput session={session} user={undefined} />
      </main>
    </Providers>
  );
}

export default Homepage;
