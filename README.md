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

Static hosting works on Netlify, Cloudflare Pages, GitHub Pages, or S3 + CloudFront. Run `npm run build` before deploy so `css/styles.css` is up to date.

For Netlify/Cloudflare, configure a SPA-style fallback to `404.html` for unknown routes if needed.

## Contact form

Uses [EmailJS](https://www.emailjs.com/). Keys are in `js/script.js`. Configure rate limits and template fields in the EmailJS dashboard.
