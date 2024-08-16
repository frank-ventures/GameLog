import { Suspense, useEffect, useState } from "react";
import QuantumSpinner from "./ldrsSpinners";
import ToggleFavouriteGameButton from "./toggleFavouriteButton";
import NewLogWrapper from "./NewLogWrapper.jsx";
import Link from "next/link";
import CoverImage from "./CoverImage";

function UserFaveItem({ fave, userFavesArray, UserID }) {
  const [matchedItem, setMatchedItem] = useState();

  useEffect(() => {
    console.log("UserFaveItem, ", userFavesArray);

    setMatchedItem(
      userFavesArray.find((eachItem) => eachItem.slug == fave.game_slug)
    );
  }, [userFavesArray]);

  console.log("matched item: ", matchedItem);

  return (
    <div
      className="individual-favourite flex flex-col border-b-[1px] border-gray-600"
      key={fave.id}
    >
      <div className="game-fave-title flex flex-col w-full justify-center items-center p-2">
        {matchedItem && (
          <Suspense fallback={"Loading image"}>
            <CoverImage
              source={matchedItem.cover.image_id}
              alt={`${matchedItem.name} cover art`}
              width={50}
              height={100}
              className="game-screenshot-image max-w-[auto] rounded-md shadow shadow-black"
            />
          </Suspense>
        )}
        <h3 className="text-center">
          <Link href={`/games/${fave.game_slug}`}>{fave.game_name}</Link>
        </h3>
        <Suspense fallback={<QuantumSpinner />}>
          <ToggleFavouriteGameButton
            GameID={fave.igdb_game_id}
            GameName={fave.game_name}
          />
        </Suspense>
      </div>
      <div className="game-fave-log flex flex-col gap-2 w-full p-2">
        <h3>Logs</h3>
        <Suspense fallback={<QuantumSpinner />}>
          <NewLogWrapper UserID={UserID} IGDBGameID={fave.igdb_game_id} />
        </Suspense>
      </div>
    </div>
  );
}

export default UserFaveItem;
