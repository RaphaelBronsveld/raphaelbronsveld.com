# Raphael Bronsveld's Blog

<img src="./.github/images/wallpaper.jpg" alt="Black background with some stars & a small spaceship">

My personal blog built with React Router v7 & Biome & Tailwind V4. Can be found at https://raphaelbronsveld.com!

## Features
- React Router 7, Biome for linting/formatting, Tailwind for styling
- MDX based blog posts with frontmatter / rehype
- Github actions with lint/typecheck/tests & deploy towards Cloudflare workers
- And so much more TODO's.

## Development

Install dependencies with `pnpm install` 

Run the dev server:

```shellscript
pnpm run dev
```

## Deploy
Deploying to Cloudflare workers is straightforward.
Set-up an access token and configure these in your repository secrets.

```shellscript
pnpm run deploy
```