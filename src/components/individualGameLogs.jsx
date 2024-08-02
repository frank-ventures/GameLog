"use client";
import getIndividualLogs from "@lib/Supabase/FetchLogs";

import { useEffect, useState } from "react";

export default function IndividualGameLogs({ UserID, IGDBGameID, Added }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function getLog() {
      setLogs(await getIndividualLogs(UserID, IGDBGameID));
    }
    getLog();
  }, [UserID, IGDBGameID, Added]);

  return (
    <>
      <div className="logs-container flex flex-col gap-1 w-full h-32 overflow-x-scroll border-[1px] border-slate-400 p-2">
        {logs
          ? logs.toReversed().map((log) => {
              return (
                <div key={log.id} className="flex gap-4 justify-between">
                  <p>{log.content}</p>
                  {/* <button className="border rounded bg-slate-300 px-2">
                    Edit
                  </button> */}
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
}
