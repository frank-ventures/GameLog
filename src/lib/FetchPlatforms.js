"use server";

// Platforms: it'd be nice for the user to see in the search bar results, which platform the game result is on. IE when searching "The Sims", the user might expect a PC result, but click on a GBA result.

export default async function FetchPlatforms(bearer, thisGame) {
  // console.log(thisGame.platforms[0] ? thisGame.platforms[0] : "no platform");
  const clientId = process.env.TWITCH_TV_ID;
  if (thisGame.platforms) {
    const platformResponse = await fetch("https://api.igdb.com/v4/platforms", {
      method: "POST",
      headers: {
        "Client-ID": clientId,
        "Authorization": `Bearer ${bearer}`,
        "Content-Type": "application/json"
      },
      body: `fields *; where id = ${thisGame.platforms[0]};`
    });

    if (!platformResponse.ok) {
      console.error("Error fetching games:", response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const platform = await platformResponse.json();

    return platform;
  }
}
