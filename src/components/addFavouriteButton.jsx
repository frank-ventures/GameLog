import { useContext, useEffect, useState } from "react";
import CheckFavouriteExists from "../lib/Supabase/CheckFavouriteExists";
import InsertFavouriteGame from "../lib/Supabase/InsertFavourite";
import RemoveFavouriteGame from "../lib/Supabase/RemoveFavourite";
import { DBUserIDContext } from "../lib/Supabase/DBUserIdContext";

export default function AddFavouriteGameButton({ GameID, GameName }) {
  // When this component is rendered, it wants to check if the user has already favourited the game, so needs this 'exists' state:
  const [exists, setExists] = useState(false);
  // This 'loading' state is to show the user something is happening once they've clicked:
  const [loading, setLoading] = useState(true);
  // This holds their Supabase ID, linked to their Clerk account:
  const [usersDatabaseID] = useContext(DBUserIDContext);

  // TODO: Remove this if statement:
  if (usersDatabaseID.id) {
    console.log("add fave button user db id: ", usersDatabaseID.id);
  }

  // On load and receipt of GameID into the button, query the DB to see if the user has favourited the game already:
  useEffect(() => {
    setLoading(true);
    async function checkFaveExists() {
      setExists(await CheckFavouriteExists(usersDatabaseID.id, GameID));
      setLoading(false);
    }
    checkFaveExists();
  }, [GameID]);

  // When the user clicks, add the favourite to the database attached to their user ID:
  // TODO: Include Platform!
  // TODO: Delete these console logs
  async function handleClick() {
    console.log("I have been clicked");

    if (exists) {
      setLoading(true);
      const success = await RemoveFavouriteGame(usersDatabaseID.id, GameID);
      if (success) {
        setExists(false);
        setLoading(false);
      } else {
        throw new Error("Removing favourite did not work.");
      }
    } else {
      setLoading(true);

      const success = await InsertFavouriteGame(
        usersDatabaseID.id,
        GameID,
        GameName
      );
      if (success) {
        setExists(true);
        setLoading(false);
      } else {
        throw new Error("Adding favourite did not work.");
      }
    }
  }

  return (
    <>
      {loading ? (
        ""
      ) : exists ? (
        <p>You have favourited this</p>
      ) : (
        <p>Not favourite</p>
      )}
      <button
        className="bg-orange-600 text-white p-6 rounded"
        onClick={handleClick}
      >
        {exists
          ? loading
            ? "loading..."
            : "Click me to unFavourite"
          : loading
          ? "loading..."
          : "Click me to Favourite"}
      </button>
    </>
  );
}
