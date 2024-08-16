"use client";
import React, { Suspense, useEffect, useState } from "react";
import QuantumSpinner from "./ldrsSpinners";
import FetchIndividualGame from "@/src/lib/IGDB/FetchIndividualGame";
import FetchFavourites from "../lib/Supabase/FetchFavourites";

const UserFaveItem = React.lazy(() => import("./UserFaveItem"));

export default function FavouritesDisplay({ UserID, Bearer }) {
  const [userFaves, setUserFaves] = useState([]);
  const [userFavesArray, setUserFavesArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("logging user faves array, ", userFavesArray);
  }, [userFavesArray]);

  useEffect(() => {
    async function fetchUserFavesOnIGDB() {
      const fetchedFaves = await Promise.all(
        userFaves.map((fave) => FetchIndividualGame(fave.game_slug))
      );
      setUserFavesArray(fetchedFaves);
    }

    if (userFaves.length > 0) {
      fetchUserFavesOnIGDB();
    }
  }, [userFaves, Bearer]);

  useEffect(() => {
    async function fetchUserFaves() {
      try {
        const response = await FetchFavourites(UserID);
        setUserFaves(await response);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user favorites", error);
        setLoading(false);
      }
    }

    fetchUserFaves();
  }, [UserID]);

  if (loading) {
    return <QuantumSpinner />;
  }

  return (
    <>
      <div className="user-favourites flex flex-col gap-2 mx-4 border border-gray-400">
        {userFaves.map((fave, index) => (
          <Suspense fallback={"Loading..."} key={fave.id}>
            <UserFaveItem
              fave={fave}
              userFavesArray={userFavesArray}
              UserID={UserID}
            />
          </Suspense>
        ))}
      </div>
    </>
  );
}
