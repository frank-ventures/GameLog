import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import MainButton from "./mainButton";
import SecondaryButton from "./secondaryButton";

export default async function CenteredInfo({ place, displayType }) {
  // place: home, signing in etc
  console.log("CenteredInfo check for place: ", place);

  const user = await currentUser();

  return (
    <div className="intro-box bg-orange-600 h-3/6 w-3/6 p-16 rounded-2xl bg-opacity-60 shadow flex flex-col items-center justify-center mb-4 text-white">
      <h1>GameLog</h1>
      {place == "home" ? (
        <h2>Your Personal Games Journal</h2>
      ) : place == "sign-in" ? (
        <h2>Sign In</h2>
      ) : (
        ""
      )}

      {/* If signed out */}
      <SignedOut>
        <div className="subtitles flex flex-col gap-2 justify-start mt-2 w-full">
          <h3>Find your games</h3>
          <h3>Make some notes</h3>
          <h3>Never forget what youre doing again</h3>
        </div>
      </SignedOut>
      <SignedOut>
        <div className="call-to-action flex gap-10">
          <MainButton href={"/sign-in"} buttonText={"Log In"} />
          <SecondaryButton href={"/sign-up"} buttonText={"Sign Up Now"} />
        </div>
      </SignedOut>

      {/* If signed in */}
      <SignedIn>
        <h2>Welcome back{user?.firstName ? ` ${user.firstName}!` : "!"}</h2>
        <div className="call-to-action flex gap-10">
          <MainButton
            href={`/profile/${user?.id}`}
            buttonText={"Your GameLog"}
          />
        </div>
      </SignedIn>
    </div>
  );
}
