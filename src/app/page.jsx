export default function Home() {
  return (
    <main className="bg-slate-900 p-2 flex items-center justify-center h-screen">
      <div className="intro-box bg-cyan-600 p-16 rounded-2xl bg-opacity-90 shadow flex flex-col items-center justify-center mb-4 ">
        <h1>GameLog</h1>
        <h2>Your Personal Games Journal</h2>
        <div className="subtitles flex flex-col gap-2 justify-start mt-2 w-full">
          <h3>Find your games</h3>
          <h3>Make some notes</h3>
          <h3>Never forget what youre doing again</h3>
        </div>
        <button className="bg-orange-600 rounded-xl mt-16 p-4 shadow-lg text-white">
          Make Some Notes
        </button>
      </div>
    </main>
  );
}
