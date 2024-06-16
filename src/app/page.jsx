import GameDisplay from "./components/gameDisplay";

export default function Home() {
  return (
    <>
      <h1>h1 Hello</h1>
      <h2>h2 Hello</h2>
      <h3>h3 Hello</h3>
      <p>I am a paragraph on the page, and below here are some game results</p>
      <div className="test-container">
        <GameDisplay />
      </div>
    </>
  );
}
