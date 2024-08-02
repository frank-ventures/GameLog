"use server";

import { db } from "./db";

// Fetch all of the users favourites in the database:
export default async function FetchFavourites(userId) {
  const response = await db.query(
    `SELECT * 
    FROM favourites 
    WHERE user_id = $1;
    `,
    [userId]
  );
  const result = response.rows;

  return result;
}
