import Header from "./components/header";

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GameLog",
  description: "Keep track of your game journeys"
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />

          {children}
        </Providers>
      </body>
    </html>
  );
}
