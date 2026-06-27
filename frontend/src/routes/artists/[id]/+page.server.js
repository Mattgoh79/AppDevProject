import { env } from "$env/dynamic/private";
import { error as svelteKitError } from "@sveltejs/kit";

const API_BASE_URL = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ fetch, params }) => {
  const res = await fetch(`${API_BASE_URL}/api/artists/${params.id}`);

  if (res.status === 404) {
    throw svelteKitError(404, "Artist not found");
  }

  const result = await res.json();

  const artist = result?.data ?? result;

  return {
    artist,
  };
};