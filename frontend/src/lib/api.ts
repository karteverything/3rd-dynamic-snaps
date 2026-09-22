import { supabase } from "./supabase";

const API_URL = import.meta.env.VITE_API_URL;

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `API request failed: ${response.status} ${errorText}`,
    );
  }

  return response.json();
}

async function getAuthHeaders() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  return {
    Authorization: `Bearer ${session.access_token}`,
  };
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
  url: string | null;
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
}

export const api = {
  getPhotos: () =>
    request<Photo[]>("/api/photos"),

  getPricing: () =>
    request<PricingPackage[]>("/api/pricing"),

  getSiteContent: () =>
    request<Record<string, string>>("/api/site"),

  getAdminPhotos: async () => {
    const headers = await getAuthHeaders();

    return request<Photo[]>("/api/admin/photos", {
      headers,
    });
  },

  updatePhoto: async (
    photoId: string,
    updates: Partial<
      Pick<
        Photo,
        | "alt_text"
        | "caption"
        | "is_published"
        | "is_featured"
        | "sort_order"
      >
    >,
  ) => {
    const headers = await getAuthHeaders();

    return request<Photo>(
      `/api/admin/photos/${photoId}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify(updates),
      },
    );
  },

  deletePhoto: async (photoId: string) => {
    const headers = await getAuthHeaders();

    return request<{ message: string }>(
      `/api/admin/photos/${photoId}`,
      {
        method: "DELETE",
        headers,
      },
    );
  },
};