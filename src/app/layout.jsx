// -- Imports --
//  Functional parts
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
//  Components
import Header from "@components/header";
import { Providers } from "@components/providers";
// Clerk
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "GameLog",
  description: "Keep track of your game journeys",
};

export default async function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={raleway.className}>
          <Providers>
            <Header />
            <main className="bg-slate-200 min-h-dvh w-dvw">{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
