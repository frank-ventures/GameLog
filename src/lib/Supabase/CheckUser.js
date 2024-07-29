"use server";

import { db } from "./db";

// Check user exists in the database
export default async function CheckUser(clerkId) {
  const response = await db.query(
    `
    SELECT * FROM users 
    WHERE clerk_id = $1
    `,
    [clerkId]
  );
  const result = response.rows[0];

  if (result?.clerk_id == clerkId) {
    return true;
  } else {
    return false;
  }
}
