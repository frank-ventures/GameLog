// Components
import CenteredInfo from "@/src/components/centeredInfo";
import FavouritesDisplay from "@/src/components/favouritesDisplay";
import Hero from "@/src/components/hero";
import PageBackground from "@/src/components/PageBackground";
// import GetBearerToken from "@/src/lib/IGDB/IGDBBearerToken";

// Database and IGDB
import GetDBUserID from "@/src/lib/Supabase/DBUserID";
// Clerk
import { currentUser } from "@clerk/nextjs/server";

export default async function UserProfilePage() {
  const user = await currentUser();
  const userDBID = await GetDBUserID();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/IGDBtoken`
  );
  const { token } = await response.json();

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
          <FavouritesDisplay UserID={userDBID.id} Bearer={token} />
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
