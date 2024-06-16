"use client";

import { BearerContext } from "@/lib/IGDBBearerTokenContext";
import FetchIndividualGame from "@/lib/IndividualGame";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function IndividualGamePage({ params }) {
  const [bearer, setBearer] = useContext(BearerContext);
  const [game, setGame] = useState([]);

  // Get the slug from the url, to search the API:
  const gameName = params.name;

  async function getGame(bearer, gameName) {
    if (bearer && gameName) {
      try {
        const newGame = await FetchIndividualGame(bearer, gameName);
        setGame(newGame);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    } else {
      setGame([]);
    }
  }

  useEffect(() => {
    getGame(bearer, gameName);
  }, [bearer, gameName]);

  console.log("IndividualGamePage game: ", game);
  return (
    <>
      {game ? (
        <>
          <h2>{game.name}</h2>
          <p>{game.summary}</p>
          <Link href={`${game.url}`}>See more on IGDB</Link>
        </>
      ) : (
        notFound()
      )}
    </>
  );
}
