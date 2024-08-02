"use server";

import { db } from "./db";

// Check if the user has favourited a specific game in the database
export default async function CheckFavouriteExists(userId, IGDBGameId) {
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

  if (result) {
    return true;
  } else {
    return false;
  }
}
