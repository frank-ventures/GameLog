"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function MainNavbar({ userId }) {
  return (
    <nav>
      <ul className="flex justify-center items-center gap-8 mr-6 text-white">
        <li>
          <Link href="/" className="fancy-link">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="fancy-link">
            About
          </Link>
        </li>
        <SignedIn>
          <li>
            <Link href={`/profile/${userId}`} className="fancy-link">
              Your GameLog
            </Link>
          </li>
        </SignedIn>
        <SignedOut>
          <li>
            <Link href="/sign-in"> Log In</Link>
          </li>
        </SignedOut>
        <SignedIn>
          <li>
            <UserButton className={"z-50"} />
          </li>
        </SignedIn>
      </ul>
    </nav>
  );
}
