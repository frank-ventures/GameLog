"use client";

import Image from "next/image";

export default function Hero({ displayName, place, displayImage }) {
  return (
    <div className="game-hero h-48 flex justify-center items-end border-b-2 border-blue-400 gap-4">
      <h1>
        {place == "gamePage"
          ? displayName
          : place == "profilePage"
          ? `Hello ${displayName}!`
          : "Oops"}
      </h1>
      {place == "profilePage" ? (
        <Image
          src={displayImage}
          alt={displayName || "The users image"}
          width={80}
          height={80}
          className="m-2 rounded-lg shadow-md"
        />
      ) : (
        ""
      )}
    </div>
  );
}
