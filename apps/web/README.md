## Prerequisites

- homebrew
- fnm, a better nvm

```zsh
brew install fnm
fnm install 18
```

- pnpm, a better npm

- fauna shell

```zsh
brew install fauna-shell # or
pnpm i -g fauna-shell
```

- aws amplify console

```zsh
f i -g @aws-amplify/cli # for amplify deploys
```

## Getting Started

First, run the development server:

```zsh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Integrations

- `react-hook-form`
- wip: `fauna`

## Docker

### The Application

### Postgres

### Fauna

```zsh
pnpm fauna:local # open fauna shell connected to local docker fauna db
```

## Deploy

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### AWS

- Flightcontrol: [https://app.flightcontrol.dev/environments/clby72bd400u4mu014e4ab0nu](Flightcontrol Console)
  -> runs on cloudfront: [https://d3l3krwby7noux.cloudfront.net/](Cloudfront Deploy)

- Amplify: [https://eu-central-1.console.aws.amazon.com/amplify/home?region=eu-central-1#/dolgeptpazmtp](Amplify Console)
  -> [https://main.dolgeptpazmtp.amplifyapp.com/](Amplify Deploy)
