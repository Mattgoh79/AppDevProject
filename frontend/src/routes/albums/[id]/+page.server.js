import { env } from "$env/dynamic/private";
import { error as svelteKitError } from "@sveltejs/kit";

const API_BASE_URL = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ fetch, params }) => {
  const res = await fetch(`${API_BASE_URL}/api/albums/${params.id}`);

  if (res.status === 404) {
    throw svelteKitError(404, "Album not found");
  }

  const result = await res.json();

  const album = result?.data ?? result;

  return {
    album,
  };
};