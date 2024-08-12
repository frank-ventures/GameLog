import { SignIn } from "@clerk/nextjs";
import PageBackground from "@/src/components/PageBackground";

export default function Page() {
  return (
    <>
      <PageBackground>
        <SignIn />
      </PageBackground>
    </>
  );
}
