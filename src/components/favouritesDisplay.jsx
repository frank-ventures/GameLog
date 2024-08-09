// React and Next
// import { useContext, useEffect, useState } from "react";
import Link from "next/link";
// Components
import ToggleFavouriteGameButton from "./toggleFavouriteButton";
// // import TestMoreData from "./testGetMoreData";
//  Database and IGDB
import NewLogWrapper from "./NewLogWrapper.jsx";
import { Suspense } from "react";
import QuantumSpinner from "./ldrsSpinners";

export default function FavouritesDisplay({ fave, UserID }) {
  console.log("FavouritesDisplay logging fave: ", fave);

  return (
    <>
      <div className="user-favourites flex flex-col gap-2 mx-4 border border-gray-400">
        {fave ? (
          <div
            className="individual-favourite flex flex-col border-b-[1px] border-gray-600"
            key={fave.id}
          >
            <div className="game-fave-title flex flex-col w-full justify-center items-center p-2">
              <h3 className="text-center">
                <Link href={`/games/${fave.game_slug}`}>{fave.game_name}</Link>
              </h3>
              <Suspense fallback={<QuantumSpinner />}>
                <ToggleFavouriteGameButton
                  GameID={fave.igdbgame_id}
                  GameName={fave.game_name}
                />
              </Suspense>
            </div>
            <div className="game-fave-log flex flex-col  gap-2 w-full p-2">
              <h3>Logs</h3>
              <NewLogWrapper UserID={UserID} IGDBGameID={fave.igdb_game_id} />
            </div>
          </div>
        ) : (
          <p>uh oh. Something went wrong. Tell Frank</p>
        )}
      </div>
    </>
  );
}
