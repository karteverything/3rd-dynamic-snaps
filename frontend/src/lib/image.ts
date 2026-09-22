const API_URL = import.meta.env.VITE_API_URL;

export function getPhotoUrl(storagePath: string) {
  return `${API_URL}/api/photos/${encodeURIComponent(
    storagePath,
  )}/url`;
}