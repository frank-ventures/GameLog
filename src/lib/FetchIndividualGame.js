"use server";

import FetchScreenshots from "./FetchScreenshots";

export default async function FetchIndividualGame(bearer, gameName) {
  const clientId = process.env.TWITCH_TV_ID;

  const body = gameName ? `fields *; where slug ="${gameName}";` : "fields *;";

  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": clientId,
      "Authorization": `Bearer ${bearer}`,
      "Content-Type": "application/json"
    },
    body: `${body}`
  });

  if (!response.ok) {
    console.error("Error fetching games:", response.statusText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const gamesarray = await response.json();
  const thisGame = gamesarray[0];

  return thisGame;
}
