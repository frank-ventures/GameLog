import Link from "next/link";

export default function MainButton({ href, buttonText }) {
  return (
    <button className="bg-slate-800 rounded-xl mt-16 p-4 shadow-lg text-white border-2 border-white">
      <Link href={href}> {buttonText}</Link>
    </button>
  );
}
