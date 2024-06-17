"use client";

import { BearerContext } from "@/lib/IGDBBearerTokenContext";
import FetchIndividualGame from "@/lib/FetchIndividualGame";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";

export default function IndividualGamePage({ params }) {
  const [bearer, setBearer] = useContext(BearerContext);
  const [game, setGame] = useState([]);
  const [images, setImages] = useState([]);

  // Get the slug from the url, to search the API:
  const gameName = params.name;

  async function getGame(bearer, gameName) {
    if (bearer && gameName) {
      try {
        const newGame = await FetchIndividualGame(bearer, gameName);
        setGame(newGame.thisGame);
        setImages(newGame.images);
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
  console.log("IndividualGamePage images: ", images);
  return (
    <>
      {game ? (
        <>
          <h2>{game.name}</h2>
          <p>{game.summary}</p>
          <div className="screenshots-box border h-auto p-1 text-center">
            <h3>Screenies</h3>
            <div className="screenshots-container flex flex-row overflow-scroll gap-4 p-1 border">
              {images.map((image) => (
                <Image
                  key={image.id}
                  src={`https://images.igdb.com/igdb/image/upload/t_720p/${image.image_id}.jpg`}
                  alt={"screenshot"}
                  width={1280}
                  height={720}
                  className="game-screenshot-image max-w-none h-[20rem]"
                />
              ))}
            </div>
          </div>
          <Link href={`${game.url}`}>See {game.name} on IGDB</Link>
        </>
      ) : (
        notFound()
      )}
    </>
  );
}
