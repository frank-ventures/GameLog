# GameLog

GameLog is an app and website where a player can keep track of which games they own, are playing, and add "notes to self" for what they're doing.

# Features

- The search bar will check [IGDB](https://www.igdb.com/) for what you've searched, and give you some of the most relevant results
- You can go to an individual game page to see info about that game.

# Future Features

# Mentions & Credits

- [IGDB for their API](https://www.igdb.com/)
- [Denise Jans on Unsplash for the background image](https://unsplash.com/photos/black-sony-dslr-camera-on-white-surface-uIemlFWQSC4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash)

### The user should be able to see which platform the game result is on

Annoyingly, when you search for a game, the result might be displaying a GBA game when you actually are looking for a PC game. To fix this requires more wrangling with the API.

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

### Once you've used arrow keys to select a list item, use 'Enter' to route to a new page

The [Next.js docs were useful here](https://nextjs.org/docs/app/api-reference/functions/use-router) for the `useRouter` syntax.

### The 'search results' div should scroll the currently selected result into view

Using React `useRef()` was key. This code helped: [Using useRef to scroll through a list of results](https://codesandbox.io/p/sandbox/react-autocomplete-forked-0o1hll?file=%2Fsrc%2Fcomponents%2FAutocomplete.js%3A60%2C15-62%2C25)

As did [this code, to prevent the page from "bouncing" when a user scrolls](https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move)

### Once you've used arrow keys to select a list item, use 'Enter' to route to a new page

The [Next.js docs were useful here](https://nextjs.org/docs/app/api-reference/functions/use-router) for the `useRouter` syntax.

### The 'search results' div should scroll the currently selected result into view

Using React `useRef()` was key. This code helped: [Using useRef to scroll through a list of results](https://codesandbox.io/p/sandbox/react-autocomplete-forked-0o1hll?file=%2Fsrc%2Fcomponents%2FAutocomplete.js%3A60%2C15-62%2C25)

As did [this code, to prevent the page from "bouncing" when a user scrolls](https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move)
