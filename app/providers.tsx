"use client";
import { SessionProvider } from "next-auth/react";
// import { useSession } from "next-auth/react";

export default function Providers({ session, children }: any) {
  // const { data: session, status } = useSession();

  return (
    // -------
    // <div>
    //   {session == null ? (
    //     <SessionProvider session={session}>{children}</SessionProvider>
    //   ) : (
    //     <SessionProvider session={session}>{children}</SessionProvider>
    //   )}
    // </div>

    // -------
    <SessionProvider session={session}>{children}</SessionProvider>
  );
}
