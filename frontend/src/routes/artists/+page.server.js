import { env } from "$env/dynamic/private";

const API_BASE_URL = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ fetch }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/artists`);
    const result = await res.json();

    // Same response-shape inconsistency seen on albums/reviews --
    // handle both { data: [...] } and { message: [...] } defensively.
    const artists = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result?.message)
        ? result.message
        : [];

    return {
      artists,
      error: null,
    };
  } catch (err) {
    return {
      artists: [],
      error: err.message,
    };
  }
};