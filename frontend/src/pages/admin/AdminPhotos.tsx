import { useEffect, useState } from "react";
import { api, type Photo } from "../../lib/api";
import { supabase } from "../../lib/supabase";

import AdminNav from "../../pages/admin/AdminNav";

export default function AdminPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAltText, setEditAltText] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadPhotos() {
    setLoading(true);

    try {
      const data = await api.getAdminPhotos();
      setPhotos(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load photos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPhotos();
  }, []);

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const filePath = `${crypto.randomUUID()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { error: databaseError } = await supabase
        .from("photos")
        .insert({
          filename: file.name,
          storage_path: filePath,
          alt_text: file.name,
          caption: "",
          sort_order: photos.length,
          is_featured: false,
          is_published: true,
        });

      if (databaseError) {
        throw databaseError;
      }

      setMessage("Photo uploaded successfully.");
      await loadPhotos();
    } catch (error) {
      console.error(error);
      setMessage("Failed to upload photo.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function startEditing(photo: Photo) {
    setEditingId(photo.id);
    setEditAltText(photo.alt_text);
    setEditCaption(photo.caption);
    setMessage("");
  }

  function cancelEditing() {
    setEditingId(null);
    setEditAltText("");
    setEditCaption("");
  }

  async function savePhoto(photoId: string) {
    setSaving(true);
    setMessage("");

    try {
      await api.updatePhoto(photoId, {
        alt_text: editAltText,
        caption: editCaption,
      });

      setMessage("Photo details saved.");
      cancelEditing();
      await loadPhotos();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save photo details.");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(photo: Photo) {
    try {
      await api.updatePhoto(photo.id, {
        is_published: !photo.is_published,
      });

      await loadPhotos();
    } catch (error) {
      console.error(error);
      setMessage("Failed to update photo.");
    }
  }

  async function toggleFeatured(photo: Photo) {
    try {
      // If this photo is already featured, simply turn it off.
      if (photo.is_featured) {
        await api.updatePhoto(photo.id, {
          is_featured: false,
        });

        await loadPhotos();
        return;
      }

      // Remove featured status from every other photo.
      await Promise.all(
        photos
          .filter((item) => item.is_featured && item.id !== photo.id)
          .map((item) =>
            api.updatePhoto(item.id, {
              is_featured: false,
            }),
          ),
      );

      // Make this photo featured.
      await api.updatePhoto(photo.id, {
        is_featured: true,
      });

      await loadPhotos();
    } catch (error) {
      console.error(error);
      setMessage("Failed to update featured photo.");
    }
  }

  async function deletePhoto(photo: Photo) {
    const confirmed = window.confirm(
      `Delete "${photo.filename}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.deletePhoto(photo.id);

      setMessage("Photo deleted successfully.");
      await loadPhotos();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete photo.");
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-sm text-neutral-500">
          Loading photos...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <AdminNav />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 border-b border-neutral-300 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-neutral-400">
              Admin
            </p>

            <h1 className="mt-3 text-4xl font-light tracking-tight">
              Photos
            </h1>
          </div>

          <label className="w-fit cursor-pointer bg-black px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800">
            {uploading ? "Uploading..." : "Upload photo"}

            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {message && (
          <div className="border-b border-neutral-300 py-5">
            <p className="text-sm text-neutral-600">
              {message}
            </p>
          </div>
        )}

        {photos.length === 0 ? (
          <div className="py-20">
            <p className="text-sm text-neutral-500">
              No photos yet.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => {
              const isEditing = editingId === photo.id;

              return (
                <article
                  key={photo.id}
                  className="overflow-hidden bg-white"
                >
                  <img
                    src={photo.url ?? ""}
                    alt={photo.alt_text}
                    className="aspect-[4/3] w-full object-cover"
                  />

                  <div className="p-5">
                    {!isEditing ? (
                      <>
                        <p className="text-sm font-medium">
                          {photo.filename}
                        </p>

                        <p className="mt-2 text-xs text-neutral-400">
                          {photo.is_published
                            ? "Published"
                            : "Unpublished"}
                        </p>

                        {photo.caption && (
                          <p className="mt-4 text-sm leading-6 text-neutral-500">
                            {photo.caption}
                          </p>
                        )}

                        <div className="mt-5 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              toggleFeatured(photo)
                            }
                            className={`border px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition ${
                              photo.is_featured
                                ? "border-black bg-black text-white"
                                : "border-neutral-300 hover:bg-neutral-900 hover:text-white"
                            }`}
                          >
                            {photo.is_featured ? "Featured" : "Set featured"}
                          </button>
                          
                          <button
                            type="button"
                            onClick={() =>
                              togglePublished(photo)
                            }
                            className="border border-neutral-300 px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition hover:bg-neutral-900 hover:text-white"
                          >
                            {photo.is_published
                              ? "Unpublish"
                              : "Publish"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              startEditing(photo)
                            }
                            className="border border-neutral-300 px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition hover:bg-neutral-900 hover:text-white"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deletePhoto(photo)
                            }
                            className="border border-red-300 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-red-600 transition hover:bg-red-600 hover:text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : (
                      <div>
                        <p className="text-sm font-medium">
                          {photo.filename}
                        </p>

                        <div className="mt-6">
                          <label
                            htmlFor={`alt-${photo.id}`}
                            className="eyebrow text-neutral-400"
                          >
                            Alt text
                          </label>

                          <input
                            id={`alt-${photo.id}`}
                            value={editAltText}
                            onChange={(event) =>
                              setEditAltText(
                                event.target.value,
                              )
                            }
                            className="mt-3 w-full border-b border-neutral-300 bg-transparent py-2 text-sm outline-none focus:border-neutral-900"
                          />
                        </div>

                        <div className="mt-6">
                          <label
                            htmlFor={`caption-${photo.id}`}
                            className="eyebrow text-neutral-400"
                          >
                            Caption
                          </label>

                          <textarea
                            id={`caption-${photo.id}`}
                            value={editCaption}
                            onChange={(event) =>
                              setEditCaption(
                                event.target.value,
                              )
                            }
                            rows={4}
                            className="mt-3 w-full resize-none border-b border-neutral-300 bg-transparent py-2 text-sm leading-6 outline-none focus:border-neutral-900"
                          />
                        </div>

                        <div className="mt-6 flex gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              savePhoto(photo.id)
                            }
                            disabled={saving}
                            className="bg-black px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 disabled:opacity-50"
                          >
                            {saving ? "Saving..." : "Save"}
                          </button>

                          <button
                            type="button"
                            onClick={cancelEditing}
                            disabled={saving}
                            className="border border-neutral-300 px-5 py-3 text-[10px] uppercase tracking-[0.2em] transition hover:bg-neutral-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}