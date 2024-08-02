"use server";

import { db } from "./db";

// Insert new user log into the database
export default async function InsertNewLog(IGDBGameId, userId, content) {
  const response = await db.query(
    `
    INSERT INTO logs
    (igdb_game_id, user_id, content)
    VALUES ($1, $2, $3)
    RETURNING *;`,
    [IGDBGameId, userId, content]
  );
  const result = response.rows;
  return result;
}
