// Components
import CenteredInfo from "@/src/components/centeredInfo";
import FavouritesDisplay from "@/src/components/favouritesDisplay";
import Hero from "@/src/components/hero";
import PageBackground from "@/src/components/homeBackground";
// Database and IGDB
// // import FetchLogs from "@/src/lib/Supabase/FetchLogs";
import GetDBUserID from "@/src/lib/Supabase/DBUserID";
import FetchFavourites from "@/src/lib/Supabase/FetchFavourites";

// Clerk
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function UserProfilePage() {
  const user = await currentUser();

  const userDBID = await GetDBUserID();

  const userFaves = await FetchFavourites(userDBID.id);

  if (user) {
    // If the user has favourites:
    if (userFaves) {
      return (
        <>
          <Hero
            displayName={user.firstName || user.username || you}
            place={"profilePage"}
            displayImage={user.imageUrl}
          />
          <Suspense fallback="loading...">
            <h2>Your Favourited Games</h2>
            {userFaves.map((favourite) => {
              console.log("I AM A LOG N THE .MAP");
              return (
                <>
                  <FavouritesDisplay fave={favourite} UserID={userDBID.id} />
                </>
              );
            })}
          </Suspense>
        </>
      );
      // If the user doesn't have favourites:
    } else {
      return (
        <>
          <p>You have no favourites! Get to it!</p>
        </>
      );
    }
  } else {
    return (
      <PageBackground>
        <CenteredInfo place="sign-in" />
      </PageBackground>
    );
  }
}
