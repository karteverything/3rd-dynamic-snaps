from fastapi import APIRouter

router = APIRouter(prefix="/api")

@router.get("/health")
async def health():
    return {"status": "ok"}


@router.get("/photos")
async def get_photos():
    # Query Supabase here
    return []


@router.get("/pricing")
async def get_pricing():
    # Query Supabase here
    return []


@router.get("/site")
async def get_site_content():
    # Query Supabase here
    return {}