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
  console.log("Indigamepage:", bearer, gameName);

  let game;
  try {
    console.log("Indigamepage: I am trying to fetch a game");
    game = await FetchIndividualGame(bearer, gameName);
    console.log("Indigamepage, I have fetched game successfully!");
  } catch (error) {
    console.error("Error fetching games:", error);
  }
  // console.log("IndividualGamePage game: ", game);

  return (
    <>
      {game ? (
        <>
          <Hero
            displayName={game.name}
            displayImage={
              game.cover?.image_id
                ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
                : NoCoverImage
            }
            place={"gamePage"}
          />
          <div className="individual-game-container p-2 flex flex-col gap-4">
            <SignedIn>
              <Suspense fallback={QuantumSpinner}>
                <ToggleFavouriteGameButton
                  GameID={game.id}
                  GameName={game.name}
                  GameSlug={game.slug}
                />
              </Suspense>
            </SignedIn>
            <div className="game-summary border-black border-2 p-2 overflow-scroll max-h-32">
              <h2>Summary</h2>

              <p id="summaryP">{game.summary}</p>
            </div>

            <div className="individual-game-genres flex gap-2 items-baseline justify-between">
              <h3>Genres:</h3>
              {game.genres?.map((genre) => genre.name).join(", ")}
            </div>

            <div className="individual-game-platforms flex gap-2 items-baseline justify-between">
              <h3>Platforms:</h3>
              {game.platforms?.map((platform) => platform.name).join(", ")}
            </div>

            <div className="similar-games-box border h-auto p-1 text-center">
              <h3>Similar Games</h3>
              <div className="similar-game-container flex flex-row overflow-scroll gap-4 p-1 border">
                {game.similar_games?.map((similar) => (
                  <div
                    key={similar.id}
                    className="similar-game-individual flex flex-col w-40 "
                  >
                    <Link href={`/games/${similar.slug}`}>
                      <CoverImage
                        source={similar.cover.image_id}
                        alt={`${similar.name} cover art`}
                        width={150}
                        height={200}
                        className="game-screenshot-image max-w-none rounded-md shadow shadow-black"
                      />

                      <h3 className="similar-game-individual-text ">
                        {similar.name}
                      </h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="screenshots-box border h-auto p-1 text-center">
              <h3>Screenies</h3>
              <div className="screenshots-container flex flex-row overflow-scroll gap-4 p-1 border">
                {game.screenshots?.map(
                  (image) => (
                    console.log("image id, ", image.image_id),
                    (
                      <Image
                        key={image.id}
                        src={`https://images.igdb.com/igdb/image/upload/t_720p/${image.image_id}.jpg`}
                        alt={"screenshot"}
                        width={1280}
                        height={720}
                        className="game-screenshot-image max-w-none h-[20rem]"
                      />
                    )
                  )
                )}
              </div>
            </div>
            <Link href={`${game.url}`}>See {game.name} on IGDB</Link>
          </div>
        </>
      ) : (
        notFound()
      )}
    </>
  );
}
