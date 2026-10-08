# Ecloria landing page

A production-ready React + TypeScript landing page with a Cloudflare Worker API and an optional D1-backed contact form.

## Stack

- React 19 + Vite
- TypeScript
- Cloudflare Workers + Static Assets
- Cloudflare D1 (SQLite) for contact enquiries
- Workers Builds for Git-based CI/CD

Node.js is used for the local build toolchain. The backend runs in Cloudflare's Node-compatible Workers runtime rather than a traditional always-on Node server.

## Local development

```bash
npm install
npm run dev
```

The site works without a database. The contact API requires the D1 binding described below.

## Add the D1 contact database

Cloudflare does not provide a first-party managed PostgreSQL database. For this small landing page, D1 is the simplest free option. To use PostgreSQL instead, create it with an external provider such as Neon or Supabase and connect it through Cloudflare Hyperdrive.

The included `wrangler.jsonc` is already connected to the `ecloria-leads` D1 database. For a fresh Cloudflare account, create a replacement database:

   ```bash
   cf d1 create --name ecloria-leads
   ```

2. Copy the returned database ID into `wrangler.jsonc`.
3. Regenerate binding types:

   ```bash
   npm run cf-typegen
   ```

4. Apply the migration remotely:

   ```bash
   cf d1 migrations apply YOUR_D1_DATABASE_ID --dir migrations
   ```

## Build and preview

```bash
npm run build
npm run preview
```

## Git-based deployment on Cloudflare

1. Push this directory to a GitHub or GitLab repository.
2. In Cloudflare, open **Workers & Pages → Create → Import a repository**.
3. Choose the repository and production branch (`main`).
4. Use these settings:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Root directory: `/` (or this folder if used in a monorepo)
5. After the first deployment, open the Worker and add the custom domain `ecloria.co.uk`.

Every push to `main` will build and deploy automatically. Branches can use Cloudflare preview builds.

## Before launch

- Replace placeholder company copy or add a registered company number if needed.
- Confirm `hello@ecloria.co.uk` exists.
- Add privacy and cookie pages if analytics or marketing trackers are introduced.
- Run the D1 migration and test the contact form.
