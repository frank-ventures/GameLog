"use server";

import { db } from "./db";

// Delete users favourite game from the database
export default async function RemoveFavouriteGame(userId, IGDBGameId) {
  let success;

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
  if (result) {
    return true;
  } else {
    return false;
  }
}
