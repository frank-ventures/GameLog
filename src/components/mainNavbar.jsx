import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function MainNavbar({ userId }) {
  return (
    <nav>
      <ul className="flex gap-8 text-white">
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
          <Link href="/sign-in"> Log In</Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </ul>
    </nav>
  );
}
