"use client";
import InsertNewLog from "@lib/Supabase/InsertLog";
import { useRef } from "react";

export default function InsertNewUserLog({ UserID, IGDBGameID, ChangeAdded }) {
  const ref = useRef();

  return (
    <>
      <form
        className="flex gap-2"
        ref={ref}
        onSubmit={async (e, formData) => {
          e.preventDefault();

          const content = e.target[0].value;
          const addNewLog = await InsertNewLog(IGDBGameID, UserID, content);
          // Calling this function (passed in from the props) toggles the 'added' state, triggering the users logs to rerender:
          ChangeAdded();
          ref.current?.reset();
        }}
      >
        <input
          type="text"
          className="w-4/5 px-2 rounded"
          placeholder="Make a log..."
        />
        <input type="submit" className="bg-orange-400 p-1 rounded"></input>
      </form>
    </>
  );
}
