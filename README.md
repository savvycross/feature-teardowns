# Feature Teardowns

Plain-English breakdowns of how popular app features work, researched with AI coding agents and REA (Reverse Engineer Anything). Each one ends with a copy-paste prompt so anyone can build their own version with an AI coding agent.

Built with [Astro](https://astro.build). Ready to deploy on Vercel.

## See the site on your computer

1. Open a terminal in this folder (in File Explorer, click the address bar, type `cmd`, press Enter).
2. Type `npm run dev` and press Enter.
3. Open http://localhost:4321 in your browser.

Leave the terminal window open while you look at the site. To stop it, click the terminal and press `Ctrl + C`.

The first time on a new computer, run `npm install` before step 2.

## Add a teardown

1. Go to `src/content/teardowns`.
2. Copy `command-palette.md` and rename the copy, e.g. `pull-to-refresh.md`. The file name becomes the web address (`/teardowns/pull-to-refresh`).
3. Edit the block at the top between the `---` lines:
   - `title`, `app`, `summary`: any text, in quotes
   - `difficulty`: exactly `Beginner`, `Intermediate` or `Advanced`
   - `readTime`: a number of minutes, no quotes
   - `date`: year-month-day; newest teardowns show first
4. Write the five sections, each starting with `## `: What it does, How it works, Diagram, Build your own, Limits and notes.
5. Put the prompt between two lines of three backticks. It gets the box and the Copy button automatically.

The new teardown appears on the home page by itself.

## Things to fill in later

All in one file, `src/site.ts`. Each one is hidden on the site until you fill it in:

- `xUrl`: your X account link (shows the "Follow on X" link)
- `buyUrl` and `price`: the checkout link and price (until both are set, the Full pack page says "Coming soon")
- `signupAction`: the form address from your email service (shows the email signup box on the home page)

The "What's included" list is at the top of `src/pages/full-pack.astro`.

## Put it online with Vercel

1. Upload this folder to a GitHub repository.
2. On vercel.com, choose "Add New Project" and pick that repository.
3. Vercel recognises Astro on its own. Leave the settings as they are and press Deploy.
