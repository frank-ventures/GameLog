import Header from "../components/header";

import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/providers";

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "GameLog",
  description: "Keep track of your game journeys"
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Providers>
          <Header />
          <main className="bg-slate-200 h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
