"use server";
//OLD:
// import GetBearerToken from "./IGDBBearerToken";
//NEW:
// import { getToken } from "@lib/IGDB/IGDBTokenManager";

export default async function FetchIndividualGame(gameName) {
  const clientId = process.env.TWITCH_TV_ID;
  // OLD:
  // const bearer = await GetBearerToken();
  // NEW:
  // const bearer = await getToken();
  const response = await fetch(`${process.env.URL}/api/IGDBtoken`, {
    headers: {
      "Cache-Control": "no-store", // Prevent caching
    },
  });
  const { token } = await response.json();

  console.log("---Bearer--- in fetchindividualgames: ", token);

  const body = gameName
    ? `fields id, cover.id, cover.image_id, first_release_date, genres.name, name, platforms.name, screenshots.id, screenshots.image_id, similar_games.id, similar_games.cover.image_id, similar_games.name, similar_games.slug,  slug, summary, url; where slug ="${gameName}";`
    : "fields *;";

  if (token) {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${token}`,
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

    return thisGame;
  }
}
