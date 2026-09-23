import { useEffect, useState } from "react";
import { api } from "../../lib/api";

import AdminNav from "../../components/AdminNav";

export default function AdminAbout() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadContent() {
      try {
        const data = await api.getSiteContent();
        setContent(data.about || "");
      } catch (error) {
        console.error(error);
        setMessage("Failed to load About content.");
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage("");

    try {
      await api.updateSiteContent("about", content);
      setMessage("About content saved.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to save About content.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-sm text-neutral-500">
          Loading About content...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <AdminNav />
      
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="border-b border-neutral-300 pb-8">
          <p className="eyebrow text-neutral-400">
            Admin
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight">
            About
          </h1>
        </div>

        {message && (
          <p className="border-b border-neutral-300 py-5 text-sm text-neutral-600">
            {message}
          </p>
        )}

        <div className="mt-10">
          <label
            htmlFor="about-content"
            className="eyebrow text-neutral-400"
          >
            About content
          </label>

          <textarea
            id="about-content"
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
            rows={16}
            className="mt-4 w-full resize-y border border-neutral-300 bg-white p-5 text-sm leading-7 outline-none focus:border-neutral-900"
            placeholder="Write your About content..."
          />

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="mt-5 bg-black px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}