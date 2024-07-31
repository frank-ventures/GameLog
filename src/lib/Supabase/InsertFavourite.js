"use server";

import { db } from "./db";

// Insert new user favourite game into the database
export default async function InsertFavouriteGame(
  userId,
  IGDBGameId,
  GameName
) {
  let success;

  const response = await db.query(
    `
    INSERT INTO favourites
    (user_id, igdb_game_id, game_name)
    VALUES
    ($1, $2, $3)
    RETURNING *;`,
    [userId, IGDBGameId, GameName]
  );
  const result = response.rows;
  if (result) {
    return true;
  } else {
    return false;
  }
}
