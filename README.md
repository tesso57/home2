# home2

This repository contains the source for **tesso.dev**, a small portfolio site
built with [React](https://react.dev/) and [Vite](https://vitejs.dev/).
The site displays a profile, works history and a blog powered by MDX files.
Data such as profile information and posts are stored under `src/assets` and
converted to pages through React Router.

## Features

- React single-page application
- Blog powered by MDX
- Router-based navigation
- Hosted on Vercel

## Requirements

- Node.js 20 or newer
- npm 9 or newer

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Directory structure

```
├─ public/            # Static assets
├─ src/
│  ├─ assets/         # Images, JSON data and MDX posts
│  ├─ components/     # Reusable React components
│  ├─ views/          # Page components used by the router
│  └─ lib/            # Utility functions
```

Blog entries live in `src/assets/posts`. Add a new `.mdx` file and include
frontmatter at the top:

```mdx
---
slug: your-post-slug
title: 記事タイトル
date: 2026-02-15
tags:
  - tag1
  - tag2
---
```

Routing and post lookup use `slug`, so the file name itself can be arbitrary.

## Getting started

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

To preview the production build locally, run:

```sh
npm run preview
```

### Lint with [Biome](https://biomejs.dev/)

Use Biome to lint and format the project:
```sh
npm run lint
```

Run TypeScript checks without emitting files:

```sh
npm run type-check
```

## License

This project is licensed under the [MIT License](LICENSE).
