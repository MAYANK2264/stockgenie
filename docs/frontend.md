Frontend
========

Stack
- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 4, Radix UI
- Recharts for charts

Run locally
```
cd frontend
npm ci
npm run dev
```

Environment
- `NEXT_PUBLIC_API_BASE` (optional): absolute URL to backend API. The static export will not handle rewrites.

Static export (GitHub Pages)
- Configured with `output: 'export'` and production `basePath='/stockgenie'`
- Build:
```
npm run build
```
Output at `frontend/out`.

Routing
- Public pages live under `src/app/(pages)`
- UI components under `src/components/ui`


