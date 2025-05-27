"use server";

import { db } from "./db";

// Check if the user has favourited a specific game in the database
export default async function CheckFavouriteExists(userId, IGDBGameId) {
  const response = await db.query(
    `
    SELECT
        gamelog_favourites.user_id, gamelog_favourites.igdb_game_id
        FROM gamelog_favourites
        WHERE gamelog_favourites.user_id = $1 AND gamelog_favourites.igdb_game_id = $2;
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
