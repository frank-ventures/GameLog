"use client";
// React and Next
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
// Components
import ToggleFavouriteGameButton from "./toggleFavouriteButton";
import IndividualGameLogs from "./individualGameLogs";
import InsertNewUserLog from "./insertNewLog";
// // import TestMoreData from "./testGetMoreData";
//  Database and IGDB
import { DBUserIDContext } from "@/src/lib/Supabase/DBUserIdContext";
import FetchFavourites from "@/src/lib/Supabase/FetchFavourites";
import { BearerContext } from "@lib/IGDB/IGDBBearerTokenContext";

export default function FavouritesDisplay() {
  const [usersDatabaseID] = useContext(DBUserIDContext);
  const [favourites, setFavourites] = useState([]);
  const [bearer, setBearer] = useContext(BearerContext);

  useEffect(() => {
    const getFaves = async () => {
      const userFaves = await FetchFavourites(usersDatabaseID.id);
      setFavourites(userFaves);
    };
    getFaves();
  }, [usersDatabaseID]);

  return (
    <>
      <h2>Your Favourited Games</h2>
      <div className="user-favourites flex flex-col gap-2 mx-4 border border-gray-400">
        {favourites.length > 0
          ? favourites.map((fave) => {
              return (
                <div
                  className="individual-favourite flex border-b-[1px] border-gray-600"
                  key={fave.id}
                >
                  <div className="game-fave-title flex flex-col w-2/12 p-2">
                    <h3>
                      <Link href={`/games/${fave.game_slug}`}>
                        {fave.game_name}
                      </Link>
                    </h3>
                    <ToggleFavouriteGameButton
                      GameID={fave.igdb_game_id}
                      GameName={fave.game_name}
                    />
                  </div>
                  <div className="game-fave-log flex flex-col w-10/12 p-2">
                    <h3>Logs</h3>
                    {/* //when the form is submitted i need to trigger the individual game logs to update. */}
                    {/* current problem is that the page doesnt refresh on form submission */}
                    {/* maybe you need to make API routes, and use SWR to sort this out */}
                    <InsertNewUserLog
                      UserID={fave.user_id}
                      IGDBGameID={fave.igdb_game_id}
                    />
                    <IndividualGameLogs
                      UserID={usersDatabaseID.id}
                      GameID={fave.igdb_game_id}
                    />
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
}
