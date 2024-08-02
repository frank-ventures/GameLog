import CenteredInfo from "@/src/components/centeredInfo";
import FavouritesDisplay from "@/src/components/favouritesDisplay";
import Hero from "@/src/components/hero";
import PageBackground from "@/src/components/homeBackground";

import FetchLogs from "@/src/lib/Supabase/FetchLogs";
import { currentUser } from "@clerk/nextjs/server";

export default async function UserProfilePage() {
  const user = await currentUser();
  // console.log(user);

  const logs = await FetchLogs(10, 1289);
  // console.log("Profile page:  ", logs);

  if (user) {
    return (
      <>
        <Hero
          displayName={user.firstName || user.username || you}
          place={"profilePage"}
          displayImage={user.imageUrl}
        />
        <FavouritesDisplay />
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
