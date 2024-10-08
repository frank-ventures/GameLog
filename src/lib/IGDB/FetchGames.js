"use server";

// import GetBearerToken from "./IGDBBearerToken";

// import { getToken } from "@lib/IGDB/IGDBTokenManager";

export default async function FetchGames(userQuery, limit) {
  const clientId = process.env.TWITCH_TV_ID;
  const apiSecret = process.env.API_SECRET;

  // const bearer = await GetBearerToken();
  // const bearer = await getToken();
  console.log("url is, ", process.env.NEXT_PUBLIC_WEBSITE_URL);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/IGDBtoken`,

    {
      headers: {
        authorization: `${apiSecret}`,
      },
      cache: "no-store",
    }
  );
  const { token } = await response.json();

  console.log("---Bearer--- in fetchgames: ", token);
  const body = userQuery
    ? `fields id, artworks.url, cover.id, cover.image_id, first_release_date, genres.*, name, platforms.name, screenshots.id, screenshots.image_id, similar_games.*, slug, url;  where name ~ *"${userQuery}"*; sort rating desc;`
    : "fields *;";
  const searchLimit = limit ? `limit ${limit};` : "limit 10;";

  if (token) {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: `${body} ${searchLimit} `,
    });
    if (!response.ok) {
      console.error("Error fetching games:", response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const games = await response.json();

    return games;
  }
}
