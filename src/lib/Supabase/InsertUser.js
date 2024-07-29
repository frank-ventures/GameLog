"use server";

import { db } from "./db";

// Insert new user into the database
export default async function InsertNewUser(clerkId, userName) {
  console.log("You've passed in: ", clerkId, userName);

  const response = await db.query(
    `
    INSERT INTO users 
    (clerk_id, username) 
    VALUES ($1, $2) RETURNING *`,
    [clerkId, userName]
  );
  const result = response.rows[0];

  if (result.clerk_id == clerkId) {
    console.log("Successful insert of new user!");
    return "success";
  }
}
