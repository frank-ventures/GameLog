"use client";
// This is a test component, but has use within a loop that maps through favourites.
// It is a framework to take an individual game request, fetch from IGDB, and return the game data.
// Could be useful to duplicate for sake of Cover Art etc.
// It's currently a client component and can be used within client components

import { useEffect, useState } from "react";
import FetchIndividualGame from "@lib/IGDB/FetchIndividualGame";

export default function TestMoreData({ Bearer, GameName }) {
  const [game, setGame] = useState();

  console.log("TEST MORE BEARER IS ", Bearer, GameName);

  useEffect(() => {
    console.log("use effect called");
    const getIndividualGame = async () => {
      const indivGame = await FetchIndividualGame(Bearer, GameName);
      setGame(indivGame);
    };
    getIndividualGame();
    console.log("GAME RESULT IN TEST DATA", game);
  }, [Bearer, GameName]);
  console.log("GAME RESULT IN TEST DATA", game);

  return <p>TESTDATA: {game?.name}</p>;
}
