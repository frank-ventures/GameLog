// Components
import CenteredInfo from "@/src/components/centeredInfo";
import FavouritesDisplay from "@/src/components/favouritesDisplay";
import Hero from "@/src/components/hero";
import PageBackground from "@/src/components/PageBackground";
// Database and IGDB
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
    return (
      <>
        <Hero
          displayName={user.firstName || user.username || you}
          place={"profilePage"}
          displayImage={user.imageUrl}
        />
        {/* If the user has favourites: */}
        {userFaves.length > 0 ? (
          <Suspense fallback="loading...">
            <h2>Your Favourited Games</h2>
            <FavouritesDisplay UserFaves={userFaves} UserID={userDBID.id} />
            {/* {userFaves.map((favourite) => {
              console.log("I AM A LOG N THE .MAP");
              return (
                <>
                  <FavouritesDisplay fave={favourite} UserID={userDBID.id} />
                </>
              );
            })} */}
          </Suspense>
        ) : (
          // If the user doesn't have favourites:

          <p>You have no favourites! Get to it!</p>
        )}
      </>
    );
  } else {
    return (
      <PageBackground>
        <CenteredInfo place="sign-in" />
      </PageBackground>
    );
  }
}
