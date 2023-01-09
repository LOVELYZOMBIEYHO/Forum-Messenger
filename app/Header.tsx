import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

import { useSession } from "next-auth/react";

function Header({ session }: any) {
  type Props = {
    // user: any;
    session: Awaited<ReturnType<typeof unstable_getServerSession>>;
    // session: any;
  };

  // const session = await unstable_getServerSession(authOptions);

  // const { data: session } = useSession();
  // const isUser = session?.user?.email === message.email;
  if (session)
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            height={10}
            width={50}
            src={session.user?.image!}
            // src="https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/__J0RTJO3M_.png"
            // src="https://links.papareact.com/jne"
            alt="Profile Picture"
          />

          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
          </div>
        </div>
        <LogoutButton />
      </header>
    );

  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            className="rounded-full mx-2 object-contain"
            src="https://cdn.pixabay.com/photo/2014/07/01/15/40/balloon-381334_1280.png"
            height={10}
            width={50}
            alt="Logo"
          />
          <p className="text-blue-400">
            Welcome to NextJS 13 & Forum Messenger
          </p>
        </div>
        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default Header;
