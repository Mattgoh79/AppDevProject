import { env } from "$env/dynamic/private";

const API_BASE_URL = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ fetch }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/albums`);
    const result = await res.json();

    const rawAlbums = result?.message;
    const albums = Array.isArray(rawAlbums)
      ? rawAlbums
      : Array.isArray(result?.data)
        ? result.data
        : [];

    return {
      albums,
      error: null,
    };
  } catch (err) {
    return {
      albums: [],
      error: err.message,
    };
  }
};