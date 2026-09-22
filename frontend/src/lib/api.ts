const API_URL = import.meta.env.VITE_API_URL;

async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export interface Photo {
  id: string;
  filename: string;
  storage_path: string;
  alt_text: string;
  caption: string;
  sort_order: number;
  is_featured: boolean;
  is_published: boolean;
  created_at?: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  price: number | null;
  currency: string;
  features: string[];
  sort_order: number;
  is_published: boolean;
  url: string;
}

export const api = {
  getPhotos: () => request<Photo[]>("/api/photos"),

  getPricing: () =>
    request<PricingPackage[]>("/api/pricing"),

  getSiteContent: () =>
    request<Record<string, string>>("/api/site"),
};