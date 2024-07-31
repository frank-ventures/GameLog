"use server";

import { db } from "./db";

// Fetch all logs associated with a users favourite game
export default async function FetchLogs(userId, IGDBGameId) {
  const response = await db.query(
    `
    SELECT 
logs.id, logs.created_at, logs.user_id, logs.igdb_game_id, logs.content,
favourites.game_name AS game_name,
favourites.platform AS platform
FROM logs, favourites
WHERE logs.user_id = $1 AND favourites.user_id = $1 AND logs.igdb_game_id = $2 AND favourites.igdb_game_id = $2;
    `,
    [userId, IGDBGameId]
  );
  const result = response.rows;

  // console.log(result);
  return result;
}
