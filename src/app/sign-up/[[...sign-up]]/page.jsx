import PageBackground from "@/src/components/PageBackground";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <PageBackground>
      <SignUp />
    </PageBackground>
  );
}
