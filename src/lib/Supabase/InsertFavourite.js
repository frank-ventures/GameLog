"use server";

import { db } from "./db";

// Insert new user favourite game into the database
export default async function InsertFavouriteGame(
  userId,
  IGDBGameId,
  GameName,
  GameSlug
) {
  const response = await db.query(
    `
    INSERT INTO favourites
    (user_id, igdb_game_id, game_name, game_slug)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;`,
    [userId, IGDBGameId, GameName, GameSlug]
  );
  const result = response.rows;
  if (result) {
    return true;
  } else {
    return false;
  }
}
