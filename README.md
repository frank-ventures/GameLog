# GameLog

[GameLog - Use it here!](https://gamelog-diary.vercel.app/)

GameLog is an app and website where a player can keep track of which games they own, are playing, and add "notes to self" for what they're doing.

![Screenshot of home page](./public/GameLog-home-page.jpg)

# Features

- The search bar will check [IGDB](https://www.igdb.com/) for what you've searched, and give you some of the most relevant results.
- You can go to an individual game page to see info about that game, including similar games.
- You can add individual games to your own favourites.
- Not only can you sign up and log in, but you have your own user page. Lucky thing!
- You can add logs to your favourited games via your user page.

# Future Features

[X] Add new logs
[X] Mobile friendly
[] Sort your favourited games by recently updated, recently added, alphabetically...
[] Edit existing logs

# Mentions & Credits

- [IGDB for their API](https://www.igdb.com/)
- [Denise Jans on Unsplash for the background image](https://unsplash.com/photos/black-sony-dslr-camera-on-white-surface-uIemlFWQSC4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash)
- [LDRS for the awesome, lightweight loaders!](https://uiball.com/ldrs/)
- Making a "Hamburger menu": [One](https://medium.com/@a.pirus/how-to-create-a-responsive-navigation-bar-in-next-js-13-e5540789a017), [Two](https://stackoverflow.com/questions/73619917/how-to-implement-responsive-mobile-nav-menu-with-next-js), [Three](https://jacobhocker.medium.com/creating-an-animated-hamburger-menu-in-nextjs-tailwind-css-9e332d428811)
- Handling the Hamburger Menu closing when tapping outside of the main box: [Isaac](https://github.com/isaacgomu) and [Darren](https://github.com/djsisson)
- [Thanks to this projects collaborators for unlocking far better IGDB queries!](https://github.com/akuyra1/week12-assignment/tree/main)

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

### When the Hamburger navigation menu is open, I should be able to click/tap the area outside of the menu, to close the menu. _(As well as press the "X" button to close it)_

I tried to implement the same code from the `searchbar`, which in that case adds an eventListener to the document _(via a useEffect)_ basically saying;

"Any click that isn't within this search results box, should close the search results box".

It didn't _quite_ translate; Clicking outside of the Hamburger menu did indeed close it, however, clicking the Hamburger button would close the menu, and then **immediately** toggle the state of `isOpen`, rendering the menu open again.

The solution?
Thanks to input from Isaac and Darren: quite simply add an `onClick` _(instead of anything else)_ to the `<div>` _behind_ the Hamburger menu, which toggles the open/closed state. This leaves the original button functionality intact.

** But the child div inherits the `onClick` of the parent div! When I click the menu box it closes as well!**

[Annoying. The child component needs and onClick function which 'stops Propagation'](https://dev.to/kunal/how-to-stop-child-elements-from-inheriting-parent-element-s-onclick-in-react-583h)
[And another solution with useRef](https://stackoverflow.com/questions/60811792/react-how-to-ignore-onclick-for-child-element/75562746#75562746)

### The user should be able to see which platform the game result is on

Annoyingly, when you search for a game, the result might be displaying a GBA game when you actually are looking for a PC game. To fix this required more wrangling with the API.

[Thanks to this project](https://github.com/akuyra1/week12-assignment/tree/main), the 'deeper dive' into the IGDB API was discovered and now platforms (and cover art!) displays on the search result.
