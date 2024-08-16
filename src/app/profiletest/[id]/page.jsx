"use client";
// Components
import Hero from "@/src/components/hero";
import PageBackground from "@/src/components/PageBackground";
// import CenteredInfo from "@/src/components/centeredInfo";
import FavouritesDisplay from "@/src/components/favouritesDisplay";
import QuantumSpinner from "@/src/components/ldrsSpinners";

// Database and IGDB
import GetDBUserID from "@/src/lib/Supabase/DBUserID";
import FetchFavourites from "@/src/lib/Supabase/FetchFavourites";
// import { currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/clerk-react";
import { Suspense, useEffect, useState } from "react";

export default function UserProfilePage() {
  const { isSignedIn, user, isLoaded } = useUser();

  const [userFaves, setUserFaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userID, setUserID] = useState();

  // Old server based fetches
  //   const user = await currentUser();
  //   const userDBID = await GetDBUserID();
  //   const userFaves = await FetchFavourites(userDBID.id);

  useEffect(() => {
    async function fetchUser() {
      // Simulate fetching user favorites from the database
      const response = await GetDBUserID(); // Replace with actual API call
      setUserID(await response);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("Profile Test Page UserID: ", userID);
    async function fetchData() {
      // Simulate fetching user favorites from the database
      const response = await FetchFavourites(userID.id); // Replace with actual API call
      setUserFaves(await response);
      setLoading(false);
    }

    fetchData();
  }, [userID]);

  if (user) {
    return (
      <>
        <Hero
          displayName={user.firstName || user.username || "you"}
          place={"profilePage"}
          displayImage={user.imageUrl}
        />
        {userFaves.length > 0 ? (
          <>
            <h2>Your Favourited Games</h2>
            {loading ? (
              <QuantumSpinner />
            ) : (
              <Suspense fallback={<QuantumSpinner />}>
                <FavouritesDisplay UserFaves={userFaves} />
              </Suspense>
            )}
          </>
        ) : (
          <p>You have no favourites! Get to it!</p>
        )}
      </>
    );
  } else {
    return "";
    //   <PageBackground>
    //     {/* <CenteredInfo place="sign-in" /> */}
    //   </PageBackground>
  }
}
