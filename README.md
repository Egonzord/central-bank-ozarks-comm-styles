# Communication Playbook — Habitat Communication & Culture

A private, single-client web tool showing a team's Communication Styles results:
team map, person profiles, pair comparisons, team pattern and the four styles.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Files

| File | What it is | Change per client? |
|---|---|---|
| `data/team.js` | Client name, date, everyone's scores, and the hand-written team pattern | **Yes** |
| `content.js` | The four styles and the pair content (Habitat IP) | No |
| `index.html`, `styles.css`, `app.js` | The site | No |
| `assets/` | Habitat logos, mark and spark | No |
| `vercel.json`, `robots.txt` | Keep the site out of search engines | No |

## New client

1. Copy this repo.
2. In `data/team.js`, update `client`, `date` and `people`. Scores are listed in the order
   Kneebouncer, Barometer, Listmaker, Doodler (each person's four should add up to 140).
   Top styles, ties, counts and averages are calculated automatically.
3. Rewrite `pattern` for the new team. It's interpretation, so review it each time.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Deploy

Push to GitHub, then import the repo in Vercel. Framework preset: **Other**. No build command, output directory is the root.

## Privacy

The site has no password. It relies on an unlisted URL plus `noindex` (meta tag, `X-Robots-Tag` header and `robots.txt`).
Anyone with the link can see every person's scores, so confirm the team agreed to sharing results, and use a
hard-to-guess Vercel project name or domain (not just the client's name).

## Optional features and settings

- **Reference sheet:** `assets/communication-styles-reference.pdf` is the workshop handout set (styles sheet + team results), linked from the Styles section. Replace the file to update it.
- **Link preview:** `assets/share-card.jpg` (1200×630). After you deploy, change `og:image` in `index.html` to the full
  address (for example `https://playbooks.teamhabitat.com/central-bank/assets/share-card.jpg`) and fill in `og:url`.
  Some apps (Teams, LinkedIn) only show the image when the address is complete.
