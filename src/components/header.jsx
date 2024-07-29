import Image from "next/image";
import Logo from "@images/GameLog-1-1.png";
import MainNavbar from "./mainNavbar";
import SearchBar from "./searchBar";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import InsertNewUser from "@lib/Supabase/InsertUser";
import CheckUser from "@lib/Supabase/CheckUser";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default async function Header() {
  const user = await currentUser();

  if (user) {
    const exists = await CheckUser(user.id);
    console.log("Header check if user exists in db: ", exists);
    if (exists != true) {
      InsertNewUser(user.id, user.username);
    }
  }
  // console.log(user);
  // console.log(user.id);
  return (
    <header className="header h-20 bg-slate-700 bg-opacity-80 flex items-center justify-between p-2">
      <div className="logo ">
        <Link href={"/"} className="flex items-center">
          <Image src={Logo} alt="Logo" className="h-16 w-auto" />
          <h3 className="text-white">GameLog</h3>
        </Link>
      </div>
      {user?.firstName ? (
        <p className="text-white">
          {" "}
          Hey {user.firstName || user.username || you}! 👋
        </p>
      ) : (
        <></>
      )}

      <SearchBar />

      <MainNavbar userId={user?.id} />
    </header>
  );
}
