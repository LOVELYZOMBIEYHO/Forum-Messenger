"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { getSession } from "next-auth/react";

// ---unstable_getServerSession
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
// ------
type Props = {
  user: any;
  // session: Awaited<ReturnType<typeof unstable_getServerSession>>;
  session: any;
};

function ChatInput({ session }: Props) {
  const [input, setInput] = useState("");
  // SWR setting
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  // console.log(messages);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  Block no session and no input text
    if (!input || !session) return;

    const messageToSend = input;

    setInput("");

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };
    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };
    // mutate() is a function of SWR
    // useSWR 有一個叫mutate的 API，它可以讓使用者手動指定用了哪個 key 的那些 useSWR 呼叫的 component，使他們接到新的資料，並 re-rerender，以用新的資料來更新畫面，有點像是 redux 那樣，有新的資料時讓各處有用到那個新的資料的地方，一起更新。
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t bg-white border-gray-100"
    >
      <input
        type="text"
        value={input}
        disabled={!session}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
