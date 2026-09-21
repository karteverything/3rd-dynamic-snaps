from fastapi import APIRouter
from app.services.supabase import supabase

router = APIRouter(prefix="/api")

@router.get("/health")
async def health():
    return {"status": "ok"}

@router.get("/photos")
async def get_photos():
    result = (
        supabase
        .table("photos")
        .select("*")
        .eq("is_published", True)
        .order("sort_order")
        .execute()
    )

    return result.data

@router.get("/pricing")
async def get_pricing():
    result = (
        supabase
        .table("pricing_packages")
        .select("*")
        .eq("is_published", True)
        .order("sort_order")
        .execute()
    )
    return result.data

@router.get("/site")
async def get_site_content():
    result = (
        supabase
        .table("site_content")
        .select("key, value")
        .execute()
    )

    return {
        item["key"]: item["value"]
        for item in result.data
    }