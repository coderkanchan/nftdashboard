import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/components/SessionProvider";


export const metadata = {
  title: "NFT Dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
} 