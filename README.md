# PostPilot AI Autopilot

AI Blog Writer that researches topics, plans SEO, writes long-form posts, and can publish to WordPress.

## Local development

Requirements:

- Node.js and npm

Install and run:

```sh
npm install
npm run dev
```

## API base URL

You can configure the backend base URL via an environment variable:

```sh
VITE_API_BASE_URL=https://postpilotai-be-production.up.railway.app
```

If not set, the app defaults to the production URL above.

Build and preview production:

```sh
npm run build
npm run preview
```

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query

## Project structure

- `src/pages` — app pages
- `src/components` — UI components
- `public` — static assets

## Deploy

You can deploy to any static hosting provider (e.g., Vercel, Netlify, Cloudflare Pages). Build with `npm run build` and deploy the generated `dist` directory.
