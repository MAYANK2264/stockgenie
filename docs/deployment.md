Deployment
==========

Frontend (GitHub Pages)
1. Ensure production base path in `frontend/next.config.ts` is `/stockgenie`
2. Build static site:
```
cd frontend
npm run build
```
3. Publish `frontend/out` to `gh-pages` branch root. Include a `.nojekyll` file.
4. In GitHub → Settings → Pages: Choose `gh-pages` branch, root.

Automate with GitHub Actions (optional)
- Create `.github/workflows/pages.yml` that builds and pushes `out` to `gh-pages` on push to `main`.

Backend
- Host FastAPI on a VM/Platform (Render/Fly/EC2) with HTTPS
- Set environment variables: `ALPACA_KEY`, `ALPACA_SECRET`, `OPENROUTER_API_KEY`
- If the frontend must talk to backend from Pages, ensure CORS allows the Pages origin

CORS
- In `backend/main.py`, update `allow_origins` to include your Pages domain.


