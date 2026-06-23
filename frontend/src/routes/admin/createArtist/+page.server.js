import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";

const API_BASE_URL = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ fetch }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/artists`);
    const artists = await res.json();

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

export const actions = {
  create: async ({ request, cookies }) => {
    const token = cookies.get("token");

    const formData = await request.formData();
    const name = formData.get("name");
const birthYear = Number(formData.get("birthYear"));    const bio = formData.get("bio");
    const artist = { name, birthYear, bio };

    try {
      const res = await fetch(`${API_BASE_URL}/api/artists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(artist),
      });

      const data = await res.json();

      if (!res.ok) {
        return fail(409, {
          error: data.message,
          errors: data.errors,
          name, 
          birthYear,
          bio, 
        });
      }

      return { success: true, message: data.message };
    } catch (err) {
      return fail(500, {
        success: false,
        error: err.message,
          name, 
          birthYear,
          bio, 
      });
    }
  },
  delete: async ({ request, cookies, fetch }) => {
    const token = cookies.get("token");

    const formData = await request.formData();
    const id = formData.get("id");

    if (!id) {
      return fail(400, { error: "Missing artist id" });
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/artists/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data = null;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        return fail(res.status, {
          error: data?.message || "Failed to delete artist",
        });
      }

      return { success: true, message: data?.message ?? "Artist deleted" };
    } catch (err) {
      return fail(500, {
        success: false,
        error: err.message,
      });
    }
  },
};