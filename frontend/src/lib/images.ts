import { api } from "./api";

export async function getPhotoUrl(
  storagePath: string,
): Promise<string> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/photos/${encodeURIComponent(
      storagePath,
    )}/url`,
  );

  if (!response.ok) {
    throw new Error("Unable to load photo");
  }

  const data: { url: string } = await response.json();

  return data.url;
}