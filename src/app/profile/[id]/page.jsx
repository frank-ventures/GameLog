import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function UserProfilePage() {
  const user = await currentUser();
  //   console.log(user);

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
      </>
    );
  } else {
    return (
      <>
        <p>You should probably sign in</p>
      </>
    );
  }
}
