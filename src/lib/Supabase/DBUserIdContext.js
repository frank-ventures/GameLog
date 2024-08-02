"use client";
import { createContext, useEffect, useState } from "react";
import GetDBUserID from "./DBUserID";

// The point of this context is because we need to query the Supabase DB to get the users ID, using their unique Clerk ID.

export const DBUserIDContext = createContext();

export function DBUserIDProvider({ children }) {
  // A variable for the users Supabase ID
  const [userDBID, setUserDBID] = useState({});

  // Because this is a client component, we need to call a server action to perform the fetch request:
  useEffect(() => {
    const getUserDBID = async () => {
      const userID = await GetDBUserID();
      setUserDBID(userID);
    };

    getUserDBID();
  }, []);

  return (
    <DBUserIDContext.Provider value={[userDBID]}>
      {children}
    </DBUserIDContext.Provider>
  );
}
