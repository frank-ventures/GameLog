import { NextResponse } from "next/server";

let cachedToken = null;
let tokenExpirationTime = null;

const clientId = process.env.TWITCH_TV_ID;
const clientSecret = process.env.TWITCH_TV_SECRET;

async function fetchNewToken() {
  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    {
      method: "POST",
      headers: {
        "Cache-Control": "no-store", // Prevent caching
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Error fetching new token:",
      response.status,
      response.statusText
    );
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Fetch Response status:", response.status);

  cachedToken = data.access_token;
  console.log("'New' token fetched. Now validating...");
  //validate here
  const isValid = await validateToken();
  if (!isValid) {
    console.log("Token is invalid, poops...");
    throw new Error("Invalid token fetched from API.");
  }
  console.log("Token validated. Getting Expiry Date...");
  // Calculate the expiration time
  tokenExpirationTime = new Date();
  tokenExpirationTime.setSeconds(
    tokenExpirationTime.getSeconds() + data.expires_in
  );
  console.log("This new bearer token is: ", cachedToken);

  console.log("This bearer expiration time is ", tokenExpirationTime);
  return cachedToken;
}

async function validateToken() {
  const response = await fetch("https://id.twitch.tv/oauth2/validate", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cachedToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    const currentTime = new Date();
    tokenExpirationTime = new Date(
      currentTime.getTime() + data.expires_in * 1000
    );
    console.log("Token Validation Response was ok!");
    console.log(
      "This bearer expiration time, after validation, is ",
      tokenExpirationTime
    );
    return true;
  } else if (response.status === 401) {
    return false;
  } else {
    console.log("Oh no! Token is invalid or expired!");
    console.log("Token Validation Response: ", response);
    console.error(
      "Unexpected response during token validation:",
      response.status,
      response.statusText
    );
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

async function getToken() {
  if (!cachedToken || new Date() > tokenExpirationTime) {
    console.log("Fetching new token...");

    return await fetchNewToken();
  }

  const isValid = await validateToken();
  if (!isValid) {
    console.log("Token is invalid, fetching new token...");

    return await fetchNewToken();
  }
  console.log("Returning cachedToken...");

  return cachedToken;
}

export async function GET(request, response) {
  try {
    console.log("API called, running getToken...");
    const token = await getToken();
    console.log("Returning token from API...");
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error in token handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
