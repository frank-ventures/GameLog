// A couple of variables which we'll use across our functions:
let cachedToken = null;
let tokenExpirationTime = null;

// First we get our ID and Secret from our linked Twitch account:
const clientId = process.env.TWITCH_TV_ID;
const clientSecret = process.env.TWITCH_TV_SECRET;

async function fetchNewToken() {
  // Here we use our secrets to get a "bearer token" from Twitch, which we'll use for our interactions with the API:
  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    { method: "POST" }
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
  cachedToken = data.access_token;

  // Calculate the expiration time based on current time + expires_in seconds
  tokenExpirationTime = new Date();
  tokenExpirationTime.setSeconds(
    tokenExpirationTime.getSeconds() + data.expires_in
  );
  console.log("This bearer expiration time is ", tokenExpirationTime);
  return cachedToken;
}

async function validateToken() {
  const response = await fetch("https://id.twitch.tv/oauth2/validate", {
    method: "GET",
    headers: {
      Authorization: `OAuth ${cachedToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    // Optionally, you can update the expiration time from the validate response
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
    // Token is invalid or expired
    console.log("Oh no! Token is invalid or expired!");
    console.log("Token Validation Response: ", response);
    return false;
  } else {
    console.error(
      "Unexpected response during token validation:",
      response.status,
      response.statusText
    );
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

async function getToken() {
  // If there is no cached token or the token has expired
  if (!cachedToken || new Date() > tokenExpirationTime) {
    console.log("Fetching new token...");
    return await fetchNewToken();
  }

  // If token exists but might be invalid, validate it
  const isValid = await validateToken();
  if (!isValid) {
    console.log("Token is invalid, fetching new token...");
    return await fetchNewToken();
  }
  console.log("Returning cachedToken...");
  console.log("This bearer expiration time is ", tokenExpirationTime);
  return cachedToken;
}

export { getToken };
