# Company Presentations

An interactive company presentation dashboard — a polished, slide-like business review app with KPI cards, financial charts, data tables, and editable content blocks. Built for presenting company performance (projects, finances, clients) in a clean, modern web UI instead of static slides.

Originally generated with [v0.app](https://v0.app).

## Features

- **Dashboard layout** — tabbed company overview with KPI cards, charts, and tables
- **Editable content blocks** — inline-editable text, numbers, dates, progress bars, and lists (no code changes needed to update figures)
- **Financial charts** — bar, line, and pie charts via Recharts with tooltips and summaries
- **Data tables** — sortable/filterable tables (TanStack Table) for projects and clients, with dedicated column definitions
- **Date context + range picker** — global date-range filtering across the dashboard
- **Dialogs, drawers, popovers** — Radix UI primitives for rich interactions
- **Form validation** — React Hook Form + Zod where inputs are involved
- **Toast notifications** — Sonner-powered feedback
- **Dark / light mode** — via `next-themes`
- **Mock data layer** — `lib/data.ts` simulates API fetches (swap in real API calls when ready)

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, static export)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) + full Radix UI set (accordion, dialog, tabs, table helpers, date picker, ...)
- [Recharts](https://recharts.org/) — charts
- [TanStack Table](https://tanstack.com/table) — data tables
- [React Hook Form](https://react-hook-form.dev/) + [Zod](https://zod.dev/) — forms/validation
- [date-fns](https://date-fns.org/) — date handling
- [Lucide](https://lucide.dev/) icons
- [@vercel/analytics](https://vercel.com/analytics)

## Quick Start

Requirements: Node.js 18+ and npm (or pnpm).

```bash
# install dependencies
npm install

# run the dev server
npm run dev
# open http://localhost:3000

# build a static production bundle (outputs to ./out)
npm run build
```

Serve the static build with any static host:

```bash
npx serve out
```

## Project Structure

```
app/
  layout.tsx            # root layout (theme provider, fonts, metadata)
  page.tsx              # home page -> renders <Dashboard />
  globals.css           # Tailwind + global styles
components/
  dashboard.tsx         # main dashboard composition
  data-table.tsx        # TanStack Table wrapper
  financial-charts.tsx  # Recharts visualizations
  editable-*.tsx        # inline-editable blocks (text, number, date, KPI card, list, progress, ...)
  columns/              # table column definitions (projects, current/future clients)
  ui/                   # shadcn/ui primitives
  theme-provider.tsx
context/
  date-context.tsx      # global date-range context
lib/
  data.ts               # mock data / simulated API fetches
  utils.ts              # cn() class-name helper
next.config.mjs         # Next.js config (static export, unoptimized images)
```

> Note: the bundled data is sample/fictional demo data. Replace the functions in `lib/data.ts` with real API calls to present live company figures.

## Environment Variables

None. The app is fully client-side and needs no secrets or backend.

## Deployment

This app is statically exported (`output: 'export'` in `next.config.mjs`), so it deploys anywhere that serves static files:

- **GitHub Pages** — this repo deploys there (see homepage link)
- **Vercel** — originally generated/synced from a v0.app deployment
- **Netlify / Cloudflare Pages / any static host** — serve the `./out` directory produced by `npm run build`

## License

MIT.

---

Built by Girish Lade — [ladestack.in](https://ladestack.in)
