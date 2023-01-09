import "../styles/globals.css";
import Header from "./Header";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession(authOptions);
  // console.log("layout", session);
  return (
    <html>
      <head />
      <body>
        <Header session={session} />
        {/* <Providers session={session}>{children}</Providers> */}
        {children}
      </body>
    </html>
  );
}
