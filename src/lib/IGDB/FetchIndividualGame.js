"use server";

export default async function FetchIndividualGame(bearer, gameName) {
  const clientId = process.env.TWITCH_TV_ID;

  const body = gameName
    ? `fields id, artworks.url, cover.id, cover.image_id, first_release_date, genres.*, name, platforms.name, screenshots.id, screenshots.image_id, similar_games.*, slug, summary, url; where slug ="${gameName}";`
    : "fields *;";

  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": clientId,
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
    body: `${body}`,
  });

  if (!response.ok) {
    console.error("Error fetching games:", response.statusText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const gamesarray = await response.json();
  const thisGame = gamesarray[0];

  console.log(thisGame);

  return thisGame;
}
