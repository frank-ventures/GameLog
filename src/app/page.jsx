export default function Home() {
  return (
    <div className="home-page-main h-full w-full">
      <div className="home-page-main-overlay flex flex-col items-center justify-center">
        <div className="intro-box bg-orange-600 h-3/6 w-3/6 p-16 rounded-2xl bg-opacity-60 shadow flex flex-col items-center justify-center mb-4 text-white">
          <h1>GameLog</h1>
          <h2>Your Personal Games Journal</h2>
          <div className="subtitles flex flex-col gap-2 justify-start mt-2 w-full">
            <h3>Find your games</h3>
            <h3>Make some notes</h3>
            <h3>Never forget what youre doing again</h3>
          </div>
          <button className="bg-slate-200 rounded-xl mt-16 p-4 shadow-lg text-black ">
            Make Some Notes! (This button does nothing right now)
          </button>
        </div>
      </div>
    </div>
  );
}
