# GameLog

GameLog is an app and website where a player can keep track of which games they own, are playing, and add "notes to self" for what they're doing.

# Features

# Process, Issues and Solutions

If you're interested, here's a bit of a "build log" describing issues faced on the project, and solutions to them.

### Server side fetch calls for IGDB API

The [IGDB API](https://api-docs.igdb.com/?javascript#requests) states

```
 Note: If you are trying to make these requests via the Browser you will run into CORS errors as the API does not allow requests directly from browsers. You can read more about CORS and how to go around this issue in the CORS Proxy section
```

As this app was build in Next.js, the solution was to make sure that the fetch calls to the IGDB API were separated away from the client components, and had `"use server"` at the top of their module.

### Search bar needed a delay, as the user types faster than the API can keep up

This helps: [React Guide](https://erikmartinjordan.com/start-search-user-not-typing)
