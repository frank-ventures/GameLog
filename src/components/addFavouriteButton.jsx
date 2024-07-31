import { useEffect, useState } from "react";
import CheckFavouriteExists from "../lib/Supabase/CheckFavouriteExists";
import InsertFavouriteGame from "../lib/Supabase/InsertFavourite";
import RemoveFavouriteGame from "../lib/Supabase/RemoveFavourite";

export default function AddFavouriteGameButton({ GameID, GameName }) {
  // when this component is rendered, it wants to check if the user has already favourted the game
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkFaveExists() {
      setExists(await CheckFavouriteExists(10, GameID));
      console.log("in button use effect : ", exists);
    }
    checkFaveExists();
  }, [GameID]);

  // When the user clicks, add the favourite to the database attached to their user ID
  // TODO: Include Platform!
  // TODO: Extract currentUser to Context so that it's only called in one place
  async function handleClick() {
    console.log("I have been clicked");

    if (exists) {
      setLoading(true);
      const success = await RemoveFavouriteGame(10, GameID);
      console.log("Successful fave delete in button?: ", success);

      if (success) {
        setExists(false);
        setLoading(false);
      } else {
        throw new Error("Removing favourite did not work.");
      }

      console.log("exists is ", exists);
    } else {
      setLoading(true);

      const success = await InsertFavouriteGame(10, GameID, GameName);
      console.log("Successful fave entry in button?: ", success);
      if (success) {
        setExists(true);
        setLoading(false);
      } else {
        throw new Error("Adding favourite did not work.");
      }
      console.log("exists is ", exists);
    }
  }

  //   One line solution to conditionally rendering the button/favourited display
  //   <div>
  //   <button onClick={handleLike}>
  //     {isLiked ? '❤️ Liked' : '🤍 Like'}
  //   </button>
  //   <span>{likes} {likes === 1 ? 'like' : 'likes'}</span>
  // </div>

  return (
    <>
      {exists ? (
        <>
          <p>You have favourited this!</p>
          <button
            className="bg-orange-600 text-white p-6 rounded"
            onClick={handleClick}
          >
            {loading ? "loading..." : "Click me to unFavourite"}
          </button>
        </>
      ) : (
        <>
          <p>You have not favourited this!</p>

          <button
            className="bg-orange-600 text-white p-6 rounded"
            onClick={handleClick}
          >
            {loading ? "loading..." : "Click me to Favourite"}
          </button>
        </>
      )}
    </>
  );
}
