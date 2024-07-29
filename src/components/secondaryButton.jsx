import Link from "next/link";

export default function SecondaryButton({ href, buttonText }) {
  return (
    <button className="bg-slate-200 rounded-xl mt-16 p-4 shadow-lg text-black border-2 border-black ">
      <Link href={href}> {buttonText}</Link>
    </button>
  );
}
