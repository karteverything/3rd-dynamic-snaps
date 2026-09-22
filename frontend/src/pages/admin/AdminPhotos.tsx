import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { api, type Photo } from "../../lib/api";

export default function AdminPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

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
              No published photos yet.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <article
                key={photo.id}
                className="bg-white"
              >
                <img
                  src={photo.url}
                  alt={photo.alt_text}
                  className="aspect-[4/3] w-full object-cover"
                />

                <div className="p-5">
                  <p className="text-sm font-medium">
                    {photo.filename}
                  </p>

                  <p className="mt-2 text-xs text-neutral-400">
                    {photo.is_published
                      ? "Published"
                      : "Unpublished"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}