# Test Build Instructions

To test the build locally before deploying:

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Check the output directory:
```bash
ls -la out/
```

4. Verify key files exist:
- `out/index.html` - Main page
- `out/dashboard/index.html` - Dashboard page
- `out/_next/` - Next.js assets

5. Test locally with a simple HTTP server:
```bash
npx serve out
```

If the build fails or files are missing, check:
- Next.js version compatibility
- Component imports
- Static export configuration
