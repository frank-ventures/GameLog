"use server";

export default async function FetchScreenshots(bearer, thisGame) {
  const clientId = process.env.TWITCH_TV_ID;
  if (thisGame.id) {
    const imageResponse = await fetch("https://api.igdb.com/v4/screenshots", {
      method: "POST",
      headers: {
        "Client-ID": clientId,
        "Authorization": `Bearer ${bearer}`,
        "Content-Type": "application/json"
      },
      body: `fields *; where game = ${thisGame.id};`
    });

    if (!imageResponse.ok) {
      console.error("Error fetching games:", response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const images = await imageResponse.json();

    return images;
  }
}
