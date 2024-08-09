"use client";
// React
import { useState } from "react";
// Components
import IndividualGameLogs from "./individualGameLogs";
import InsertNewUserLog from "./insertNewLog";

export default function NewLogWrapper({ UserID, IGDBGameID }) {
  // This state acts as a toggle for when a new log is added. It's passed into the log display, and the function into InsertNewUserLog:
  const [added, setAdded] = useState(false);

  return (
    <>
      <InsertNewUserLog
        UserID={UserID}
        IGDBGameID={IGDBGameID}
        ChangeAdded={() => setAdded(!added)}
      />
      <IndividualGameLogs
        UserID={UserID}
        IGDBGameID={IGDBGameID}
        Added={added}
      />
    </>
  );
}
