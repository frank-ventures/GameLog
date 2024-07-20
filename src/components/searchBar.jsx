"use client";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { BearerContext } from "@/lib/IGDBBearerTokenContext";
import Link from "next/link";
import FetchGames from "@/lib/FetchGames";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [bearer, setBearer] = useContext(BearerContext);
  const [games, setGames] = useState([]);
  const [resultIsOpen, setResultIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");
  const router = useRouter();

  //searchRef uses the useRef hook to reference the div containing the search bar and results, so we can handle if a user clicks away from the search bar:
  const searchRef = useRef(null);

  // async function searchGames(event) {
  //   event.preventDefault();
  //   const userQuery = event.target.value;
  //   const searchLimit = 50;

  //   if (userQuery.length > 1) {
  //     if (bearer) {
  //       try {
  //         const newGames = await FetchGames(bearer, userQuery, searchLimit);
  //         setGames(newGames);
  //         // If there are games results, set the 'result open' div to true:
  //         setResultIsOpen(true);
  //       } catch (error) {
  //         console.error("Error fetching games:", error);
  //       }
  //     }
  //   } else {
  //     setResultIsOpen(false);
  //     setGames([]);
  //   }
  // }

  // This function checks if a click occurred outside of the referenced div and, if so, sets resultIsOpen to false:
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setResultIsOpen(false);
    }
  };

  // this functions handles Arrow Key press events, to let a user scroll through the list
  const handleKeyDown = (e) => {
    if (e.target.value.length === 0) {
      setCurrentIndex(0);
      return;
    }

    if ((e.key === "Enter") & (currentIndex === -1)) {
      setUserQuery(e.target.value);
    }
    if ((e.key === "Enter") & (currentIndex != -1)) {
      router.push(`/games/${games[currentIndex].slug}`);
      setResultIsOpen(false);
    }

    if (e.key === "ArrowDown") {
      // increment the index by 1 and set the search value to the name of the game at that index
      setCurrentIndex(currentIndex + 1);

      setSearch(games[currentIndex + 1].name);
      if (currentIndex === games.length - 1) {
        // if we reached the end of the list, reset the index to 0 to restart from the beginning
        setCurrentIndex(0);
      }
    }
    if (e.key === "ArrowUp") {
      // increment the index by 1 and set the search value to the name of the game at that index
      setCurrentIndex(currentIndex - 1);

      setSearch(games[currentIndex - 1].name);
      // if (currentIndex === games.length - 1) {
      //   // if we reached the end of the list, reset the index to 0 to restart from the beginning
      //   setCurrentIndex(0);
      // }
    }
    return;
  };

  // Adds an event listener for mousedown events to call handleClickOutside, and cleans up the event listener when the component is unmounted:
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // This useEffect handles the search function, but only starts after the user has finished typing:
  useEffect(() => {
    // Define the function:
    const searchGames = async () => {
      const searchLimit = 50;

      const newGames = await FetchGames(bearer, userQuery, searchLimit);
      setGames(newGames);
      // If there are games results, set the 'result open' div to true:
      setResultIsOpen(true);
      setCurrentIndex(-1);
      setSearch(games[currentIndex].name);
    };

    // Call the function after the timer:
    let timer = setTimeout(() => {
      if (userQuery.length > 1) {
        if (bearer) {
          try {
            searchGames();
          } catch (error) {
            console.error("Error fetching games:", error);
          }
        }
      } else {
        setResultIsOpen(false);
        setGames([]);
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [bearer, userQuery]);

  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp * 1000);
      const options = { year: "numeric" };
      return date.toLocaleDateString(undefined, options);
    } else {
      return;
    }
  };

  return (
    <>
      <div
        ref={searchRef}
        className="search-bar w-2/6 bg-slate-300 rounded-lg p-2 relative"
      >
        <p className="text-xs">For testing, Bearer Token: {bearer}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            id="searchQuery"
            placeholder="Search games"
            className="p-1 rounded w-full"
            autoComplete="off"
            onChange={(e) => setUserQuery(e.target.value)}
            onFocus={() => setResultIsOpen(games.length > 0)}
            onKeyDown={handleKeyDown}
          />
        </form>
        {resultIsOpen ? (
          <div className="search-results absolute left-0 flex flex-col gap-1 mt-2 max-h-60 w-full overflow-scroll bg-slate-800 text-white rounded">
            <ul>
              {games.length > 0 ? (
                games.map((game, index) => (
                  <li
                    key={index}
                    className={
                      (search === game.name) & (currentIndex === index)
                        ? "active"
                        : ""
                    }
                  >
                    <Link
                      href={`/games/${game.slug}`}
                      className="text-sm p-2 search-bar-link flex justify-between"
                      onClick={() => setResultIsOpen(false)}
                    >
                      <p>
                        {game.name} index: {index}
                      </p>
                      <p className="text-sm italic">
                        {formatDate(game.first_release_date)}
                      </p>
                    </Link>
                  </li>
                ))
              ) : (
                <p className="p-2">No results found</p>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
