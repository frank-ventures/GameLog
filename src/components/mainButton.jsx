import Link from "next/link";

export default function MainButton({ href, buttonText }) {
  return (
    <button className="cta-button bg-slate-800 rounded-xl mt-16 p-4 text-white border-2 border-black">
      <Link href={href}> {buttonText}</Link>
    </button>
  );
}
