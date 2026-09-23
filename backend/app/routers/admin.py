from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.supabase import supabase

router = APIRouter(
    prefix="/api/admin",
    tags=["Admin"],
)

class PhotoUpdate(BaseModel):
    alt_text: str | None = None
    caption: str | None = None
    is_published: bool | None = None
    is_featured: bool | None = None
    sort_order: int | None = None

class SiteContentUpdate(BaseModel):
    value: str

@router.get("/photos")
async def get_admin_photos():
    result = (
        supabase
        .table("photos")
        .select("*")
        .order("sort_order")
        .execute()
    )
    photos = []

    for photo in result.data:
        try:
            signed = (
                supabase
                .storage
                .from_("photos")
                .create_signed_url(
                    photo["storage_path"],
                    60 * 60,
                )
            )
            photo["url"] = signed["signedURL"]
        except Exception:
            photo["url"] = None
        photos.append(photo)
    return photos

@router.patch("/photos/{photo_id}")
async def update_photo(
    photo_id: str,
    data: PhotoUpdate,
):
    updates = {
        key: value
        for key, value in data.model_dump().items()
        if value is not None
    }

    if not updates:
        raise HTTPException(
            status_code=400,
            detail="No changes supplied",
        )
    
    result = (
        supabase
        .table("photos")
        .update(updates)
        .eq("id", photo_id)
        .execute()
    )

    if not result.data:
        raise HTTPException(
            status_code=404,
            detail="Photo not found",
        )
    
    return result.data[0]

@router.delete("/photos/{photo_id}")
async def delete_photo(photo_id: str):
    result = (
        supabase
        .table("photos")
        .select("storage_path")
        .eq("id", photo_id)
        .single()
        .execute()
    )

    if not result.data:
        raise HTTPException(
            status_code=404,
            detail="Photo not found",
        )

    storage_path = result.data["storage_path"]
    supabase.storage.from_("photos").remove([
        storage_path
    ])

    supabase.table("photos").delete().eq(
        "id",
        photo_id,
    ).execute()

    return {
        "message": "Photo deleted successfully"
    }

@router.put("/site/{key}")
async def update_site_content(
    key: str,
    data: SiteContentUpdate,
):
    result = (
        supabase
        .table("site_content")
        .upsert(
            {
                "key": key,
                "value": data.value,
            },
            on_conflict="key",
        )
        .execute()
    )

    if not result.data:
        raise HTTPException(
            status_code=500,
            detail="Failed to save site content",
        )

    return result.data[0]