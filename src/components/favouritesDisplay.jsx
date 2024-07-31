"use client";
import { useContext, useEffect, useState } from "react";
import { DBUserIDContext } from "@/src/lib/Supabase/DBUserIdContext";
import FetchFavourites from "@/src/lib/Supabase/FetchFavourites";
import ToggleFavouriteGameButton from "./toggleFavouriteButton";
import FetchLogs from "../lib/Supabase/FetchLogs";
import IndividualGameLogs from "./individualGameLogs";

export default function FavouritesDisplay() {
  const [usersDatabaseID] = useContext(DBUserIDContext);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const getFaves = async () => {
      const userFaves = await FetchFavourites(usersDatabaseID.id);
      setFavourites(userFaves);
    };
    getFaves();
  }, [usersDatabaseID]);

  async function getIndividualLogs(userID, gameID) {
    console.log("FAVES DISPLAY ASYNC FUNCTION CALLED");
    const logs = await FetchLogs(userID, gameID);
    return logs;
  }

  return (
    <>
      <h2>Your Favourited Games</h2>
      <div className="user-favourites flex flex-col gap-2 mx-4 border border-gray-400">
        {favourites.length > 0
          ? favourites.map((fave) => {
              return (
                <div
                  className="individual-favourite border-b-[1px] border-gray-600"
                  key={fave.id}
                >
                  <h3>{fave.game_name}</h3>
                  <ToggleFavouriteGameButton
                    GameID={fave.igdb_game_id}
                    GameName={fave.game_name}
                  />
                  <IndividualGameLogs
                    UserID={usersDatabaseID.id}
                    GameID={fave.igdb_game_id}
                  />
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
}
