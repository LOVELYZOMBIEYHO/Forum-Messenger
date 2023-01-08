import "../styles/globals.css";
import Header from "./Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        {/* <Header /> */}
        {/* <Providers session={session}>{children}</Providers> */}
        {children}
      </body>
    </html>
  );
}
