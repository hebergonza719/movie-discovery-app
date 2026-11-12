# Movie Discovery

A React and TypeScript app that fetches the first page of popular horror movies from TMDB. It displays them in a responsive grid and lets you sort by release date.

## Run locally

1. Use Node.js 22.12 or newer.
2. Create a `.env.local` file next to `package.json` and add your TMDB API key:

   ```dotenv
   VITE_TMDB_BASE_URL=https://api.themoviedb.org
   VITE_TMDB_API_KEY=your_key_here
   ```

3. Install dependencies and start the app:

   ```bash
   npm i && npm start
   ```

4. Open the local URL printed in the terminal.
