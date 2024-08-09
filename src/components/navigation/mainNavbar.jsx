"use client";
// React and Next
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
// Components
import Sidebar from "./sidebar";

export default function MainNavbar({ userId }) {
  const [width, setWidth] = useState();
  const [isOpen, setIsOpen] = useState(false);

  // -- -- -- --
  // -- Getting screen width for mobile view --
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
  // This handles when the Hamburger button is pressed, AND also when 'outside of' the link menu is clicked:
  // (Thank you Isaac and Darren for suggesting adding 'onClick' to the div. Kings.)
  const handleClick = (e) => {
    console.log("handleclick caled");

    setIsOpen(!isOpen);
  };

  // When Hamburger menu is open, adds a class to the body so that the user cannot scroll:
  useEffect(() => {
    document.body.classList.toggle("mobile-nav-is-open", isOpen);
  }, [isOpen]);

  function childDoesNothing(e) {
    e.stopPropagation();
    console.log("child click");
  }

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
          <div
            onClick={handleClick}
            className="mobile-nav-backlay absolute h-screen w-screen top-0 left-0 flex items-center justify-center"
          >
            <div
              onClick={(e) => childDoesNothing(e)}
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
            ? "flex-col text-[2rem] pl-4 items-start"
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
