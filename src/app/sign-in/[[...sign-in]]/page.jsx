import { SignIn } from "@clerk/nextjs";
import PageBackground from "@/src/components/homeBackground";

export default function Page() {
  return (
    <>
      <PageBackground>
        <SignIn />
      </PageBackground>
    </>
  );
}
