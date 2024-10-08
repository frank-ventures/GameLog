"use client";
// React and Next
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
//  Database and IGDB
import FetchGames from "@lib/IGDB/FetchGames";
// Other
import NoCoverImage from "@images/no-cover-image.jpg";

export default function SearchBar({ Bearer }) {
  const [games, setGames] = useState([]);
  const [resultIsOpen, setResultIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // -- -- -- --
  // -- Handling 'clicking away' from the search bar results --
  // searchRef uses the useRef hook to reference the div containing the search bar and results, so we can handle if a user clicks away from the search bar:
  const searchRef = useRef(null);
  const selectedRef = useRef(null);

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

  // -- -- -- --
  // -- Scrolling the currently selected search result into view --
  function setChange() {
    const selected = selectedRef?.current?.querySelector(".active");
    if (selected) {
      selected?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }

  // -- -- -- --
  // -- Navigating search results with arrow keys --
  // This functions handles Arrow Key press events, to let a user scroll through the list, and also Enter key to click through to a page:
  const handleKeyDown = (e) => {
    // Reset:
    if (e.target.value.length === 0) {
      setCurrentIndex(0);
      return;
    }

    // Handle Enter if the user is not on a result:
    if ((e.key === "Enter") & (currentIndex === -1)) {
      setUserQuery(e.target.value);
    }
    // Handle Enter if the user is on a result:
    if ((e.key === "Enter") & (currentIndex != -1)) {
      router.push(`/games/${games[currentIndex].slug}`);
      setResultIsOpen(false);
    }

    if (e.key === "ArrowDown") {
      if (currentIndex === games.length - 1) {
        // if we reached the end of the list, reset the index to 0 to restart from the beginning
        setCurrentIndex(0);
        setSearch(games[0].name);
        return;
      }
      // increment the index by 1 and set the search value to the name of the game at that index
      setCurrentIndex(currentIndex + 1);
      setSearch(games[currentIndex + 1].name);
    }
    if (e.key === "ArrowUp") {
      if (currentIndex === 0 || currentIndex === -1) {
        setCurrentIndex(games.length - 1);
        setSearch(games[games.length - 1].name);
        return;
      }
      // increment the index by 1 and set the search value to the name of the game at that index
      setCurrentIndex(currentIndex - 1);
      setSearch(games[currentIndex - 1].name);
    }

    return;
  };

  // -- -- -- --
  // -- Fetching game results --
  // This useEffect handles the search function, but only starts after the user has finished typing:
  useEffect(() => {
    // Define the function:
    const searchGames = async () => {
      const searchLimit = 50;

      const newGames = await FetchGames(userQuery, searchLimit);
      setGames(newGames);

      // If there are games results, set the 'result open' div to true:
      setResultIsOpen(true);
      setCurrentIndex(-1);
      setSearch(games[currentIndex]?.name || "NoGame");
    };

    // Call the function after the timer:
    let timer = setTimeout(() => {
      if (userQuery.length > 1) {
        if (Bearer) {
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
  }, [Bearer, userQuery]);

  // -- -- -- --
  // -- Formatting the Date --
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
    <div
      ref={searchRef}
      className="search-bar bg-slate-300 w-2/5 rounded-lg p-2 relative"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {Bearer ? (
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
        ) : (
          <p className="p-1 rounded w-full bg-white">Loading search...</p>
        )}
      </form>
      {resultIsOpen ? (
        <div className="search-results absolute left-0 flex flex-col gap-1 mt-2 max-h-96 w-full overflow-scroll bg-slate-800 text-white rounded border-[1px] border-slate-400">
          <ul ref={selectedRef}>
            {games.length > 0 ? (
              games.map((game, index) => {
                setTimeout(() => {
                  setChange();
                }, [50]);

                return (
                  <li
                    id={`${index + game.slug}`}
                    key={index}
                    className={
                      (search === game.name) & (currentIndex === index)
                        ? "active"
                        : ""
                    }
                  >
                    <Link
                      href={`/games/${game.slug}`}
                      draggable={false}
                      className="text-sm p-2 search-bar-link flex justify-between"
                      onClick={() => setResultIsOpen(false)}
                    >
                      <Image
                        src={
                          game.cover?.image_id
                            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
                            : NoCoverImage
                        }
                        alt={`Cover art for ${game.name}`}
                        width={75}
                        height={75}
                      />

                      <div className="search-result-game-title-info w-full px-4 flex flex-col justify-evenly">
                        <p className="text-xl">{game.name}</p>
                        <p className="italic text-sm text-right">
                          {game?.platforms?.length > 2
                            ? `${game.platforms[0].name},  ${game.platforms[1].name} and more...`
                            : game?.platforms
                                ?.map((platform) => platform.name)
                                .join(", ")}
                        </p>
                      </div>
                      <p className="text-sm italic">
                        {formatDate(game.first_release_date)}
                      </p>
                    </Link>
                    {/* TODO: SOME CONDITIONAL FOR IF THE USER HAS FAVOURITED IT, AND IF NOT, A MINI BUTTON TO DO SO.
                    Like a filled in star icon, and a non filled in star icon. */}
                  </li>
                );
              })
            ) : (
              <p className="p-2">No results found</p>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
