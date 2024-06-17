"use client";

import { useContext, useEffect, useState } from "react";
import { BearerContext } from "../lib/IGDBBearerTokenContext";
import FetchGames from "../lib/FetchGames";

export default function GameDisplay() {
  const [bearer, setBearer] = useContext(BearerContext);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const newGames = await FetchGames(bearer);
        setGames(newGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    if (bearer) {
      // Ensure bearer is truthy before fetching games:
      fetchGames();
    }
  }, [bearer]);

  return (
    <>
      <h2>Games</h2>
      {games?.map((game) => {
        return (
          <div key={game.id} className="mb-4">
            <p>Game ID: {game.id}</p>
            <p>{game.name}</p>
            <p>{game.summary}</p>
          </div>
        );
      })}
    </>
  );
}
