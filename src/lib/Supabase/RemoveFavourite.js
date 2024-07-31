"use server";

import { db } from "./db";

// Insert new user favourite game into the database
export default async function RemoveFavouriteGame(userId, IGDBGameId) {
  let success;
  console.log("RemoveFaveGame - You've passed in: ", userId, IGDBGameId);

  const response = await db.query(
    `
    DELETE FROM 
    favourites 
    WHERE user_id = $1 
    AND igdb_game_id = $2
    RETURNING *;`,
    [userId, IGDBGameId]
  );
  const result = response.rows;
  console.log(result);
  if (result) {
    return true;
  } else {
    return false;
  }
}
