import Image from "next/image";
import Logo from "@images/GameLog-1-1.png";
import MainNavbar from "./navigation/mainNavbar";
import SearchBar from "./searchBar";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import InsertNewUser from "@lib/Supabase/InsertUser";
import CheckUser from "@lib/Supabase/CheckUser";

export default async function Header() {
  const user = await currentUser();

  // At the moment the following token fetch is used because we use it in the Search Bar to set a loading state. That's probably silly and will get removed.
  const apiSecret = process.env.API_SECRET;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/IGDBtoken`,

    {
      headers: {
        authorization: `${apiSecret}`,
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  const bearer = data.token;

  console.log("Header: Is user null?, ", user ? "no" : "yes");

  if (user != null) {
    // console.log("The current user (in the Header if statement) is, ", user);
    const exists = await CheckUser(user.id);
    if (exists == undefined) {
      InsertNewUser(user.id, user.username);
    }
  }

  // console.log(user);
  // console.log(user.id);
  return (
    <header className="header h-24 bg-slate-700 bg-opacity-80 flex items-center justify-between p-4">
      <div className="logo">
        <Link href={"/"} className="logo-link flex items-center">
          <Image src={Logo} alt="Logo" className="h-16 w-auto" />
          <div className="logo-text flex flex-col">
            <h3 className="text-white">GameLog</h3>
            <p className="italic text-xs text-white">Vers: Alpha 0.1</p>
          </div>
        </Link>
      </div>

      <SearchBar Bearer={bearer} />

      <MainNavbar userId={user?.id} />
    </header>
  );
}
