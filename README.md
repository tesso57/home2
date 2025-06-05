# home2

This repository contains the source for **tesso.dev**, a small portfolio site
built with [Vue&nbsp;3](https://vuejs.org/) and [Vite](https://vitejs.dev/).
The site displays a profile, works history and a blog powered by MDX files.
Data such as profile information and posts are stored under `src/assets` and
converted to pages through Vue Router.

## Features

- Vue 3 single-page application
- Blog powered by MDX
- Router-based navigation
- Hosted on Vercel

## Requirements

- Node.js 20 or newer
- npm 9 or newer

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Directory structure

```
├─ public/            # Static assets
├─ src/
│  ├─ assets/         # Images, JSON data and MDX posts
│  ├─ components/     # Reusable Vue components
│  ├─ views/          # Page components used by the router
│  ├─ router/         # Route definitions
│  └─ lib/            # Utility functions
```

Blog entries live in `src/assets/posts` and are listed in
`src/assets/data/blogs.json`. Update these files to add new posts.

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
