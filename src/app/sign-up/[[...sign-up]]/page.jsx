import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="home-page-main h-full w-full">
      <div className="home-page-main-overlay flex flex-col items-center justify-center">
        <SignUp />
      </div>
    </div>
  );
}
