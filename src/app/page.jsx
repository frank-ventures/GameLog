import GameDisplay from "../components/gameDisplay";

export default function Home() {
  return (
    <>
      <h1>GameLog</h1>
      <h2>Your Personal Games Journal</h2>
      <h3>Find your games</h3>
      <h3>Make some notes</h3>
      <h3>Never forget what youre doing again</h3>

      <div className="test-container">
        <GameDisplay />
      </div>
    </>
  );
}
