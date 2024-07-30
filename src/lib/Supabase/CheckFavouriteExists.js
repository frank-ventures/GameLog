"use server";

import { db } from "./db";

// Check the users favourites in the database
export default async function CheckFavouriteExists(userId, IGDBGameId) {
  console.log(userId, IGDBGameId);
  const response = await db.query(
    `
    SELECT
        favourites.user_id, favourites.igdb_game_id
        FROM favourites
        WHERE favourites.user_id = $1 AND favourites.igdb_game_id = $2;
    `,
    [userId, IGDBGameId]
  );
  const result = response.rows[0];
  // console.log(result);

  if (result) {
    return true;
  } else {
    return false;
  }
}
