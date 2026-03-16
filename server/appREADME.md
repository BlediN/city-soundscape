# web103_unit3_project

## Local setup

- Install dependencies: `npm install`
- Initialize database schema (no sample inserts): `npm run db:init`
- Start dev servers: `npm run dev`

## Production flow

- Build frontend assets into `server/public`: `npm run build`
- Start backend server: `npm run start`
- In hosted production, set `NODE_ENV=production` so Express serves the built frontend and static assets.

## Database behavior

- The app reads locations/events directly from your Supabase database.
- `server/config/reset.js` now creates required tables only and does not truncate or seed data.
- Add and manage real records in Supabase (`public.locations`, `public.events`) and the frontend will reflect them through the API.