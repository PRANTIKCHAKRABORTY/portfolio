# Prantik Chakraborty — Portfolio

A production-oriented personal portfolio built without Streamlit.

## Stack
- Next.js 15 + TypeScript
- Tailwind CSS + Framer Motion
- Python + FastAPI
- OpenAI API for the portfolio assistant
- Docker + Docker Compose
- PostgreSQL service included in Compose for future persistence

## Run locally

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000`.

### Backend
```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Set `OPENAI_API_KEY` to enable the AI assistant. `NEXT_PUBLIC_API_URL` can point the frontend to a deployed FastAPI service.

## Production deployment

- Deploy `frontend/` to Vercel.
- Deploy `backend/` to Render, Railway, Fly.io, or another FastAPI-compatible host.
- Set `FRONTEND_ORIGIN` to the exact frontend origin.
- Set `OPENAI_API_KEY` and optionally `OPENAI_MODEL` on the backend.
- The original resume PDF is included at `frontend/public/resume.pdf`.

## Content source

Profile content is based on the supplied resume. No Streamlit frontend is used.


### Project repositories
Each project card links directly to its GitHub repository and opens in a new tab.
