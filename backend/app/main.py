from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import public, admin

app = FastAPI(
    title="Photographer API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://3rd-dynamic-snaps.vercel.app/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(public.router)
app.include_router(admin.router)

@app.get("/api/health")
async def health():
    return {"status": "ok"}