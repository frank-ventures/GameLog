import CenteredInfo from "@/src/components/centeredInfo";
import FavouritesDisplay from "@/src/components/favouritesDisplay";
import Hero from "@/src/components/hero";
import PageBackground from "@/src/components/homeBackground";
import QuantumSpinner from "@/src/components/ldrsSpinners";

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
        <h2>Your Logs</h2>
        {logs.map((log) => {
          return (
            <div key={log.id}>
              <p>{log.game_name}</p>
              <p>{log.content}</p>
            </div>
          );
        })}
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
