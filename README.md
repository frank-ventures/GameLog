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

### Ho to use Vercel System Environment Variables to access an API route on a git branch

Boy oh Boy Vercel, can you just have clear documentation on how to do this please?

I had to strain and struggle [to find this blog post](https://vercel.community/t/create-a-website-url-env-variable-for-all-environments/804) which eventually solved my issue, [but not without seeing the struggles of multiple others here](https://github.com/vercel/next.js/discussions/16429).
Effort.

### Management of the IGDB Bearer Token needed handling in a better way

An old habit from a [short-term bootcamp project](https://github.com/preciousdafitohwo/Week-5-Group-Project?tab=readme-ov-file) was to fetch a brand new Bearer Token to allow interaction with the IGDB API on every page load/function call 👀

_...bad_

[Better behaviour](https://dev.twitch.tv/docs/authentication/) _(as per the docs... +1 for reading.)_ would be to:

- Make an initial call to get a Bearer Token,
- Store that token and its validation length (around 60 days),
- Validate the token when making a call,
- Only replace it when necessary.

Benefits of this would be that the app uses just the one token, but multiple users can concurrently use the app!

This forced me down a _real headscratcher_ of a solution-finding mission, as some NextJs'y things **really** got in my way; namely, behaviour to do with caching responses from fetch requests.

I was trying all manner of solutions within NextJs itself, but eventually resorted to storing the bearer token on the database for now.

[I documented my solution here, in an entirely separate repo](https://github.com/frank-ventures/igdb-bearer-token-playground)

**Changes implemented:**

- An API route create to separate out the logic.
- Much improved module logic with functions for: `getToken`, `fetchNewToken`, `validateToken`, and to store the token in a local variable.
- I **finally** (maybe) found a way to prevent Next.js from caching the bearer token and it's validation response...
- Added in some authentication so that if the user goes to the /api route in their web page, they get DEEE-NIED!

[Using this webpage as a bit of guidance, I promptly ignored the use of middleware.js for now, but instead used an authorisation in the request.header, combined with a secret key in the .env](https://blog.tericcabrel.com/protect-your-api-routes-in-next-js-with-middleware/)

A very useful thing to find was:
`cache: "no-store"` - [Docs](https://nextjs.org/docs/app/building-your-application/caching)
But it was hard for me to nail it down as the helpful thing, and to find exactly where to put it (and to be honest I don't think I have it in the right place yet.)

[This stack overflow post led me to it](https://stackoverflow.com/questions/77475455/nextjs-14-appears-to-be-caching-api-request-data-even-when-data-has-changed)

and on top of that, I think the use of `export const dynamic = "force-dynamic"` was also useful.
