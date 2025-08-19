Troubleshooting
===============

Windows build errors (numpy/meson)
- Ensure prebuilt wheels are used; upgrade pip
- If errors persist, use Python 3.11 and latest pip

`next export` removed
- Use `output: 'export'` (already configured) and `npm run build`

Static export + API
- Rewrites don’t work; set `NEXT_PUBLIC_API_BASE` to absolute backend URL and call it directly

CORS
- Add your Pages origin to `allow_origins` in FastAPI CORS middleware

Model missing at startup
- `predict.py` lazy-loads model; endpoints that need it will return 500 until `ml/model.pkl` is created by running `train_model.py`


