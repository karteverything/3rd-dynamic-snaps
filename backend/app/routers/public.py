from fastapi import APIRouter, HTTPException
from app.services.supabase import supabase
from pydantic import BaseModel

router = APIRouter(prefix="/api")

class ContactMessage(BaseModel):
    name: str
    email: str
    phone: str | None = None
    message: str

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
        .order("is_featured", desc=True)
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

@router.get("/photos/{storage_path:path}/url")
async def get_photo_url(storage_path: str):
    try:
        result = (
            supabase
            .storage
            .from_("photos")
            .create_signed_url(
                storage_path,
                60 * 60,
            )
        )
        return {
            "url": result["signedURL"],
        }
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Photo not found",
        )

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

@router.post("/contact")
async def submit_contact_message(
    data: ContactMessage,
):
    result = (
        supabase
        .table("contact_messages")
        .insert({
            "name": data.name,
            "email": data.email,
            "phone": data.phone,
            "message": data.message,
        })
        .execute()
    )

    if not result.data:
        raise HTTPException(
            status_code=500,
            detail="Failed to save contact message",
        )

    return {
        "message": "Your message has been sent successfully.",
    }