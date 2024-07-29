import PageBackground from "@components/homeBackground";
import CenteredInfo from "../components/centeredInfo";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <PageBackground>
      <SignedOut>
        <CenteredInfo place="home" />
      </SignedOut>
      <SignedIn>
        <CenteredInfo place="home" />
      </SignedIn>
    </PageBackground>
  );
}
