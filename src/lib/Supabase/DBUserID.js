"use server";

//Why have we had to do this? To successfully do the Clerk check and the Supabase check in one function.
import { currentUser } from "@clerk/nextjs/server";
import CheckUser from "./CheckUser";

export default async function GetDBUserID() {
  // Get clerk id:
  const user = await currentUser();

  // Query database with clerk id:
  if (user != null) {
    const DBID = await CheckUser(user.id);

    return await DBID;
  }

  // Return database user object, which contains their id:
  return;
}
