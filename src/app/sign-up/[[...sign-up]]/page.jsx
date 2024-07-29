import PageBackground from "@/src/components/homeBackground";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <PageBackground>
      <SignUp />
    </PageBackground>
  );
}
