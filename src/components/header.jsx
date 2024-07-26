import Image from "next/image";
import Logo from "@images/GameLog-1-1.png";
import MainNavbar from "./mainNavbar";
import SearchBar from "./searchBar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header h-20 bg-slate-700 bg-opacity-80 flex items-center justify-between p-2">
      <div className="logo ">
        <Link href={"/"} className="flex items-center">
          <Image src={Logo} alt="Logo" className="h-16 w-auto" />
          <h3 className="text-white">GameLog</h3>
        </Link>
      </div>

      <SearchBar />

      <MainNavbar />
    </header>
  );
}
