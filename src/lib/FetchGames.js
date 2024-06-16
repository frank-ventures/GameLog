"use server";

export default async function FetchGames(bearer, userQuery, limit) {
  const clientId = process.env.TWITCH_TV_ID;

  const body = userQuery ? `fields *; search "${userQuery}";` : "fields *;";
  const bodyLimit = limit ? `limit ${limit};` : "limit 10;";

  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": clientId,
      "Authorization": `Bearer ${bearer}`,
      "Content-Type": "application/json"
    },
    body: `${body} ${bodyLimit}`
  });

  if (!response.ok) {
    console.error("Error fetching games:", response.statusText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const games = await response.json();
  return games;
}
