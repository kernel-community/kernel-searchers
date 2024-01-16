# kernel searcher's app

## Introduction

TODO

## Installation

Node version: `v18.19.0`

You need to have nvm.

To install and select specific node version: `nvm i 18.19.0 && nvm 18.19.0`

Copy `.env.example` to `.env`: `cp .env.example .env`

```sh
export RPC_URL=
export PRIVATE_KEY=

export NEXT_PUBLIC_ALCHEMY_ID=
export NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
export SESSION_SECRET=

export AIRTABLE_PERSONAL_ACCESS_TOKEN=
export AUTH_TOKEN=

export DATABASE_URL=postgresql://kernel:secretpassword@localhost:5436/atlas
```

You will be needing Alchemy API, WalletConnect Project ID, Airtable API keys.

Run `docker compose up -d` to start postgres database.

Run `npx prisma migrate` to run db migrations.

Run `npm run dev` to start development server.
