# Personal Portfolio website

Portfolio for Rakesh Shrestha — Cloud & DevOps Engineer.

## Requirements

- Node.js 18+
- `assets/rakesh-shrestha.jpeg` for the profile photo (included in deployment)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

### Scripts

| Command | Description |
| -------- | ----------- |
| `npm run dev` | Build CSS and serve on port 3000 |
| `npm start` | Build CSS and serve (default port) |
| `npm run build` | Compile Tailwind into `css/styles.css` |
| `npm run dev:css` | Watch and rebuild CSS during development |

## Project structure

- `index.html` — main page
- `css/input.css` — Tailwind source + custom styles
- `css/styles.css` — generated CSS (run `npm run build` after editing `input.css`)
- `js/script.js` — theme, navigation, contact form (EmailJS)
- `assets/` — images and favicon

## Deploy

### Vercel (recommended)

The repo includes `vercel.json`. Vercel runs `npm run build`, which compiles CSS and copies the site into `public/` for deployment.

Push to GitHub and connect the repo in Vercel, or run `vercel` from the CLI. Ensure the project **Output Directory** is `public` (set automatically via `vercel.json`).

### Other hosts

Run `npm run build` first. Deploy the contents of `public/` (or the repo root if you only copy `css/styles.css` and serve from root).

For Netlify/Cloudflare, publish directory: `public` after build, or root with a build command of `npm run build`.

## Contact form

Uses [EmailJS](https://www.emailjs.com/). Keys are in `js/script.js`. Configure rate limits and template fields in the EmailJS dashboard.
