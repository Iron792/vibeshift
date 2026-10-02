# VibeShift — Playlist Transfer Starter

A clean Next.js starter for a Spotify ↔ YouTube playlist transfer app.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current state

- Premium landing page
- Transfer flow shell
- Responsive dark music UI
- Provider abstraction can be added next
- `.env.example` prepared for Spotify + Google/YouTube OAuth
- No fake API transfer logic

## Suggested next implementation order

1. Spotify OAuth
2. Google/YouTube OAuth
3. Provider service interfaces
4. Live playlist fetching
5. Track normalization + matching engine
6. Review/match UI
7. Destination playlist creation
8. Transfer queue + progress
9. Database + transfer history
10. Security, rate limits, deployment

Use official Spotify and YouTube APIs. Never scrape either platform or expose client secrets in browser code.
