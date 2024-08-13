"use server";

export default async function FetchIndividualGame(bearer, gameName) {
  console.log("Hello. I am the function FetchIndividualGame. I've been called");
  const clientId = process.env.TWITCH_TV_ID;

  const body = gameName
    ? `fields id, cover.id, cover.image_id, first_release_date, genres.name, name, platforms.name, screenshots.id, screenshots.image_id, similar_games.id, similar_games.cover.image_id, similar_games.name, similar_games.slug,  slug, summary, url; where slug ="${gameName}";`
    : "fields *;";

  console.log("Here's the clientID and the body, ", clientId, body);
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": clientId,
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
    body: `${body}`,
  });
  console.log("FetchIndividualGame response is, ", response);
  console.log("FetchIndividualGame response.ok is, ", response.ok);

  if (!response.ok) {
    console.error("Error fetching games:", response.statusText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const gamesarray = await response.json();
  const thisGame = gamesarray[0];

  console.log("FetchIndividualGame thisgame is: ", thisGame);

  return thisGame;
}
