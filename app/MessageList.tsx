"use client";
import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { Message } from "../typings";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "../pusher";

type Props = {
  initialMessages: Message[];
};

function MessageList({ initialMessages }: Props) {
  // ---SWR------
  // const {
  //   data: messages,
  //   error,
  //   mutate,
  // } = useSWR<Message[]>("/api/getMessages", fetcher);
  // -------------
  // SWR TEST2

  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);
  // ------

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (data: Message) => {
      // console.log("Messages >>>", messages);
      // if you sent the message, no need to update cache. Ensure no error with "Warning: Encountered two children with the same key, `acd4a2f9-e046-4630-a0a1-80cc3264436d`. Keys should be unique"
      if (messages?.find((message) => message.id === data.id)) return;

      // Pusher - console.log -- look like notification
      console.log("--NEW Message from Pusher", data.message, "--");
      // Pusher - console.log -- look like notification

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMessages).map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
