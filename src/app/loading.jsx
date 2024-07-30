"use client";
import { quantum } from "ldrs";

export default function Loading() {
  quantum.register();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <p>I am loading...</p>

      <l-quantum size="45" speed="1.75" color="black"></l-quantum>
    </div>
  );
}
