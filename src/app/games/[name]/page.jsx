// React and Next
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
//  Database and IGDB
import FetchIndividualGame from "@lib/IGDB/FetchIndividualGame";
// Components
import ToggleFavouriteGameButton from "@/src/components/toggleFavouriteButton";
import { SignedIn } from "@clerk/nextjs";
import Hero from "@/src/components/hero";
import NoCoverImage from "@images/no-cover-image.jpg";
import CoverImage from "@/src/components/CoverImage";
import GetBearerToken from "@/src/lib/IGDB/IGDBBearerToken";
import { Suspense } from "react";
import QuantumSpinner from "@/src/components/ldrsSpinners";

export default async function IndividualGamePage({ params }) {
  const bearer = await GetBearerToken();
  // Get the slug from the url, to search the API:
  const gameName = params.name;
  let game;
  try {
    game = await FetchIndividualGame(bearer, gameName);
  } catch (error) {
    console.error("Error fetching games:", error);
  }

  console.log("IndividualGamePage game: ", game);

  return (
    <>
      {game ? (
        <>
          <Hero displayName={game.name} place={"gamePage"} />
          <SignedIn>
            <Suspense fallback={QuantumSpinner}>
              <ToggleFavouriteGameButton
                GameID={game.id}
                GameName={game.name}
                GameSlug={game.slug}
              />
            </Suspense>
          </SignedIn>
          <p>{game.summary}</p>
          <Image
            src={
              game.cover?.image_id
                ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
                : NoCoverImage
            }
            alt={`Cover art for ${game.name}`}
            width={75}
            height={75}
          />
          <h2>Genres</h2>
          {game.genres?.map((genre) => {
            return (
              <>
                <p>{genre.name}</p>
              </>
            );
          })}
          <h2>Platforms</h2>
          {game.platforms?.map((plat) => {
            return (
              <>
                <p>{plat.name}</p>
              </>
            );
          })}

          {/* HEY FRANKIE, YOU WERE WORKING ON THE SIMILAR GAMES SECTION - PROBS ADD <LINKS> */}
          <div className="similar-games-box border h-auto p-1 text-center">
            <h3>Similar Games</h3>
            <div className="similar-game-container flex flex-row overflow-scroll gap-4 p-1 border">
              {game.similar_games?.map((similar) => (
                <div
                  key={similar.id}
                  className="similar-game-individual flex flex-col w-40"
                >
                  <Link href={`/games/${similar.slug}`}>
                    <CoverImage
                      source={similar.cover.image_id}
                      alt={`${similar.name} cover art`}
                      width={150}
                      height={320}
                      className="game-screenshot-image max-w-none rounded-md"
                    />

                    <h3>{similar.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="screenshots-box border h-auto p-1 text-center">
            <h3>Screenies</h3>
            <div className="screenshots-container flex flex-row overflow-scroll gap-4 p-1 border">
              {game.screenshots?.map((image) => (
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
