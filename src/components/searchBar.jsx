"use client";
import { useContext, useState, useEffect, useRef } from "react";
import { BearerContext } from "@/lib/IGDBBearerTokenContext";
import Link from "next/link";
import FetchGames from "@/lib/FetchGames";

export default function SearchBar() {
  const [bearer, setBearer] = useContext(BearerContext);
  const [games, setGames] = useState([]);
  const [resultIsOpen, setResultIsOpen] = useState(false);
  //searchRef is uses the useRef hook to reference the div containing the search bar and results, so we can handle if a user clicks away from the search bar:
  const searchRef = useRef(null);

  async function searchGames(event) {
    event.preventDefault();
    const userQuery = event.target.value;
    const searchLimit = 50;

    if (userQuery.length > 1) {
      if (bearer) {
        try {
          const newGames = await FetchGames(bearer, userQuery, searchLimit);
          setGames(newGames);
          // If there are games results, set the 'result open' div to true:
          setResultIsOpen(true);
        } catch (error) {
          console.error("Error fetching games:", error);
        }
      }
    } else {
      setResultIsOpen(false);
      setGames([]);
    }
  }

  // This function checks if a click occurred outside of the referenced div and, if so, sets resultIsOpen to false:
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setResultIsOpen(false);
    }
  };

  // Adds an event listener for mousedown events to call handleClickOutside, and cleans up the event listener when the component is unmounted:
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={searchRef}
        className="search-bar w-2/6 bg-slate-300 rounded-lg p-2 relative"
      >
        <p className="text-xs">For testing, Bearer Token: {bearer}</p>
        <form onSubmit={searchGames}>
          <input
            type="text"
            id="searchQuery"
            placeholder="Search games"
            className="p-1 rounded w-full"
            autoComplete="off"
            onChange={searchGames}
            onFocus={() => setResultIsOpen(games.length > 0)}
          />
        </form>
        {resultIsOpen ? (
          <div className="search-results absolute flex flex-col gap-1 mt-2 max-h-60 w-full overflow-scroll bg-slate-800 text-white rounded">
            {games.length > 0 ? (
              games.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.slug}`}
                  className="text-sm p-2 search-bar-link"
                  onClick={() => setResultIsOpen(false)}
                >
                  {game.name}
                </Link>
              ))
            ) : (
              <p className="p-2">No results found</p>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}
