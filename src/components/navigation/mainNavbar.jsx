"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";

export default function MainNavbar({ userId }) {
  const [width, setWidth] = useState();
  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (width > 999)
    return (
      <>
        <NavBarLinks window="desktop" userId={userId} />
      </>
    );
  if (width < 1000)
    return (
      <>
        <Sidebar isOpen={isOpen} setIsOpen={handleClick} userId={userId} />
        {isOpen ? (
          <div className="mobile-nav-backlay absolute h-screen w-screen top-0 left-0 flex items-center justify-center">
            <div className="mobile-nav  h-5/6 w-5/6 flex items-center justify-center rounded-lg">
              <NavBarLinks
                setIsOpen={handleClick}
                window="mobile"
                userId={userId}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
}

export function NavBarLinks({ setIsOpen, window, userId }) {
  console.log(window);
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-10 h-10", // Custom width and height
      //userButtonPopoverCard: "bg-slate-800", // Custom background for the popover card
      //userButtonPopoverActionButton: "text-red-600", // Custom text color for action buttons
    },
  };
  return (
    <nav>
      <ul
        className={`flex ${
          window == "mobile"
            ? "flex-col text-[2rem] items-start"
            : " items-center"
        }  justify-center gap-8 mr-6 text-white`}
      >
        <li>
          <Link href="/" className="fancy-link" onClick={setIsOpen}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="fancy-link" onClick={setIsOpen}>
            About
          </Link>
        </li>
        <SignedIn>
          <li>
            <Link
              href={`/profile/${userId}`}
              className="fancy-link"
              onClick={setIsOpen}
            >
              Your GameLog
            </Link>
          </li>
        </SignedIn>
        <SignedOut>
          <li>
            <Link href="/sign-in" className="fancy-link" onClick={setIsOpen}>
              Log In
            </Link>
          </li>
        </SignedOut>
        <SignedIn>
          <li>
            <UserButton className={"z-50 "} appearance={userButtonAppearance} />
          </li>
        </SignedIn>
      </ul>
    </nav>
  );
}
