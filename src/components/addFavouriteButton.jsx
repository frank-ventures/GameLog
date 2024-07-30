import { useEffect, useState } from "react";
import CheckFavouriteExists from "../lib/Supabase/CheckFavouriteExists";
import InsertFavouriteGame from "../lib/Supabase/InsertFavourite";

export default function AddFavouriteGameButton({ GameID, GameName }) {
  // when this component is rendered, it wants to check if the user has already favourted the game
  const [exists, setExists] = useState(false);

  useEffect(() => {
    async function checkFaveExists() {
      setExists(await CheckFavouriteExists(10, GameID));
      console.log("in button use effect : ", exists);
    }
    checkFaveExists();
  }, [GameID, exists]);

  // When the user clicks, add the favourite to the database attached to their user ID
  // TODO: Include Platform!
  async function clicked() {
    console.log("I have been clicked");
    const success = await InsertFavouriteGame(10, GameID, GameName);
    console.log("Successful fave entry in button?: ", success);
    if (success) {
      setExists(true);
    }
  }

  return (
    <>
      {exists ? (
        <p>No! You have favourited this!</p>
      ) : (
        <button
          className="bg-orange-600 text-white p-6 rounded"
          onClick={clicked}
        >
          I am a fave button
        </button>
      )}
    </>
  );
}
