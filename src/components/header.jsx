import Image from "next/image";
import Logo from "@images/GameLog-1-1.png";
import MainNavbar from "./mainNavbar";
import SearchBar from "./searchBar";

export default function Header() {
  return (
    <header className="border-b-2 bg-slate-700 flex items-center justify-between p-2">
      <div className="logo flex">
        <Image src={Logo} alt="Logo" className="h-16 w-auto" />
        <h3 className="text-white">GameLog</h3>
      </div>

      <SearchBar />

      <MainNavbar />
    </header>
  );
}
