"use server";

import { db } from "./db";

// Fetch all logs associated with a users favourite game
export default async function FetchLogs(userId, IGDBGameId) {
  const response = await db.query(
    `
    SELECT 
gamelog_logs.id, gamelog_logs.created_at, gamelog_logs.user_id, gamelog_logs.igdb_game_id, gamelog_logs.content,
gamelog_favourites.game_name AS game_name,
gamelog_favourites.platform AS platform
FROM gamelog_logs, gamelog_favourites
WHERE gamelog_logs.user_id = $1 AND gamelog_favourites.user_id = $1 AND gamelog_logs.igdb_game_id = $2 AND gamelog_favourites.igdb_game_id = $2;
    `,
    [userId, IGDBGameId]
  );
  const result = response.rows;

  // console.log(result);
  return result;
}
