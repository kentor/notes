# Notes

A React and TypeScript notes app built with Vite.

## Setup

Use Node.js 24 and pnpm 12.10.1. With nvm installed:

```sh
nvm install
nvm use
```

Install pnpm using the [pnpm installation instructions](https://pnpm.io/installation),
then install the project dependencies:

```sh
pnpm install --frozen-lockfile
```

The `packageManager` field pins the pnpm version used by the project and CI.

## Commands

- `pnpm start`: start the development server.
- `pnpm build`: build the application into `public/`.
- `pnpm preview`: serve the production build locally.
- `pnpm gen-icons`: regenerate React icons from `src/icons/` using Node.js.
- `pnpm type-check`: check application code, scripts, and Vite configuration.
- `pnpm lint`: run ESLint.
- `pnpm test`: run tests once.
- `pnpm test:watch`: run tests in watch mode.
- `pnpm fmt`: format source and configuration files.
- `pnpm fmt-check`: check formatting without changing files.

Generated icons and build output are excluded from formatting. For VS Code
formatting, install the Prettier extension (`esbenp.prettier-vscode`).

TypeScript is kept on 6.0.x and ESLint on 9.x to match the supported versions of
the installed lint plugins.

Vite resolves the `App/*` alias directly from `tsconfig.json` using its built-in
`resolve.tsconfigPaths` option.
