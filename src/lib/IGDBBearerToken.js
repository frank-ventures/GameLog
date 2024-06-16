"use server";

export default async function GetBearerToken() {
  // First we get our ID and Secret from our linked Twitch account:
  const clientId = process.env.TWITCH_TV_ID;
  const clientSecret = process.env.TWITCH_TV_SECRET;

  let bearer;
  // Then we use them to get a "bearer token" from Twitch, which we'll use for our interactions with the API:
  try {
    const response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      {
        method: "POST"
      }
    );

    if (!response.ok) {
      // If the response status is not OK, log the status and status text:
      console.error(
        "Error fetching data:",
        response.status,
        response.statusText
      );
      const text = await response.text();
      console.error("Response text:", text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    bearer = await response.json();
  } catch (error) {
    console.error("An error occurred:", error);
  }
  return await bearer.access_token;
}
