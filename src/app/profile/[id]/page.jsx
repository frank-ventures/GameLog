import CenteredInfo from "@/src/components/centeredInfo";
import PageBackground from "@/src/components/homeBackground";
import FetchLogs from "@/src/lib/Supabase/FetchLogs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function UserProfilePage() {
  const user = await currentUser();
  // console.log(user);

  const logs = await FetchLogs(10, 1289);
  // console.log("Profile page:  ", logs);

  if (user) {
    return (
      <>
        <h1 className="pt-48">
          Hello {user.firstName || user.username || you}!
        </h1>
        <Image
          src={user.imageUrl}
          alt={user.username || "The users image"}
          width={500}
          height={500}
        />
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
