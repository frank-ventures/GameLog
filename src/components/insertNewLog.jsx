import InsertNewLog from "@lib/Supabase/InsertLog";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export default function InsertNewUserLog({ UserID, IGDBGameID }) {
  const router = useRouter();

  //   async function handleSubmit(formData) {
  //     e.preventDefault();
  //     console.log(formData);
  //   }

  return (
    <>
      <form
        className="flex gap-2"
        onSubmit={async (e, formData) => {
          e.preventDefault();
          console.log("we want this!: ", e.target[0].value);
          const content = e.target[0].value;

          const addNewLog = await InsertNewLog(IGDBGameID, UserID, content);
          console.log(addNewLog);
          router.refresh();

          //   revalidatePath(`/profile/[id]`, "page");

          // const updatedLikes = await incrementLike();
          // setLikes(updatedLikes);
        }}
      >
        <input type="text" className="w-4/5" />
        <input type="submit" className="bg-orange-400 p-1 rounded"></input>
      </form>
    </>
  );
}
