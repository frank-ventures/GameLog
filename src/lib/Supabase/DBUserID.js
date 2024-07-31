"use server";

//Why have we had to do this? To successfully do the Clerk check and the Supabase check in one function.
import { currentUser } from "@clerk/nextjs/server";
import CheckUser from "./CheckUser";

export default async function GetDBUserID() {
  // Get clerk id:
  const user = await currentUser();
  console.log("db id get user: ", user.id);

  // Query database with clerk id:
  const DBID = await CheckUser(user.id);
  console.log("db get db id : ", DBID);

  // Return database user object, which contains their id:
  return await DBID;
}
