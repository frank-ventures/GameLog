// Components
import CenteredInfo from "@/src/components/centeredInfo";
import FavouritesDisplay from "@/src/components/favouritesDisplay";
import Hero from "@/src/components/hero";
import PageBackground from "@/src/components/PageBackground";
// import GetBearerToken from "@/src/lib/IGDB/IGDBBearerToken";

// Database and IGDB
import GetDBUserID from "@/src/lib/Supabase/DBUserID";
import { getToken } from "@lib/IGDB/IGDBTokenManager";
// Clerk
import { currentUser } from "@clerk/nextjs/server";

export default async function UserProfilePage() {
  const user = await currentUser();
  // const bearer = await GetBearerToken();
  const bearer = await getToken();
  const userDBID = await GetDBUserID();

  if (user) {
    return (
      <>
        <Hero
          displayName={user.firstName || user.username || you}
          place={"profilePage"}
          displayImage={user.imageUrl}
        />
        <div className="user-favourites flex flex-col gap-2 mx-4">
          <h2>Your Favourited Games</h2>
          <p>And your bearer token.....maybe: {bearer}</p>

          <FavouritesDisplay UserID={userDBID.id} Bearer={bearer} />
        </div>
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
