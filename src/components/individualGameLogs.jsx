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
    <div className="logs-container w-full">
      {logs
        ? logs.toReversed().map((log) => {
            return (
              <div key={log.id} className="flex gap-4 justify-between">
                <p>{log.content}</p>
                <button className="border rounded bg-slate-300 px-2">
                  Edit
                </button>
              </div>
            );
          })
        : ""}
    </div>
  );
}
