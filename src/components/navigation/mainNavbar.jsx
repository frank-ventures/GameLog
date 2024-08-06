"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar";

export default function MainNavbar({ userId }) {
  const [width, setWidth] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Function for updating width state:
  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  // Updates our 'width' state depending on users screen size, then conditionally renders the mobile or desktop nav bar:
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  // -- -- -- --
  // -- Hamburger --
  // This handles when the Hamburger button is pressed:
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // When Hamburger menu is open, adds a class to the body so that the user cannot scroll:
  useEffect(() => {
    document.body.classList.toggle("mobile-nav-is-open", isOpen);
  }, [isOpen]);

  // -- -- -- --
  // -- Clicking outside of the mobile orange menu --
  // This function checks if a click occurred outside of the referenced div and, if so, sets resultIsOpen to false:
  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  // Adds an event listener for mousedown events to call handleClickOutside, and cleans up the event listener when the component is unmounted:
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // -- -- -- --
  // Conditionally rendering mobile menu or desktop menu:
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
            <div
              ref={navRef}
              className="mobile-nav flex items-center justify-center rounded-lg"
            >
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
