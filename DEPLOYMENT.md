# GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## How it works

1. **Automatic Deployment**: Every push to the `main` or `master` branch triggers a deployment
2. **Build Process**: The GitHub Actions workflow:
   - Installs Node.js dependencies
   - Builds the Next.js application for static export
   - Deploys the built files to GitHub Pages

## Configuration

- **Next.js**: Configured with `output: 'export'` for static site generation
- **GitHub Actions**: Workflow file at `.github/workflows/gh-pages.yml`
- **Build Output**: Static files are generated in `frontend/out/` directory
- **Static Export**: Optimized for GitHub Pages with proper routing

## Manual Deployment

To manually trigger a deployment:
1. Go to the Actions tab in your GitHub repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" and select the branch

## Local Development

```bash
cd frontend
npm install
npm run dev
```

## Building Locally

```bash
cd frontend
npm run build
```

The built files will be in `frontend/out/` directory.

## Troubleshooting

- Ensure GitHub Pages is enabled in your repository settings
- Check that the repository has the necessary permissions for GitHub Actions
- Verify the workflow runs successfully in the Actions tab
- If you see white screen or 404 errors:
  - Check that the build output contains all necessary files
  - Verify the `out/` directory structure is correct
  - Ensure no dynamic imports or server-side features are used
- Test the build locally first using the instructions in `test-build.md`
