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
  const [loading, setLoading] = useState(false);

  // This state acts as a toggle for when a new log is added. It's passed into the log display, and the function into InsertNewUserLog:
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getFaves = async () => {
      const userFaves = await FetchFavourites(usersDatabaseID.id);
      setFavourites(userFaves);
      setLoading(false);
    };
    getFaves();
  }, [usersDatabaseID]);

  return (
    <>
      <h2>Your Favourited Games</h2>
      <div className="user-favourites flex flex-col gap-2 mx-4 border border-gray-400">
        {loading
          ? "Loading favourites..."
          : favourites.length > 0
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
                  <div className="game-fave-log flex flex-col  gap-2 w-10/12 p-2">
                    <h3>Logs</h3>
                    <InsertNewUserLog
                      UserID={usersDatabaseID.id}
                      IGDBGameID={fave.igdb_game_id}
                      ChangeAdded={() => setAdded(!added)}
                    />

                    <IndividualGameLogs
                      UserID={usersDatabaseID.id}
                      IGDBGameID={fave.igdb_game_id}
                      Added={added}
                    />
                  </div>
                </div>
              );
            })
          : "No favourites to show - Get searching!"}
      </div>
    </>
  );
}
