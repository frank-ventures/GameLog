"use client";
import getIndividualLogs from "@lib/Supabase/FetchLogs";
import { useEffect, useState } from "react";

export default function IndividualGameLogs({ UserID, GameID }) {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    async function getLog() {
      setLogs(await getIndividualLogs(UserID, GameID));
    }
    getLog();
  }, [UserID, GameID]);

  return (
    <>
      {logs
        ? logs.toReversed().map((log) => {
            return (
              <div key={log.id}>
                <p>{log.content}</p>
              </div>
            );
          })
        : ""}
    </>
  );
}
