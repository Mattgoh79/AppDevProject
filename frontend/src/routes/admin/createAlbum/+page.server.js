import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";

const API_BASE_URL = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ fetch }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/albums`);
    const albums = await res.json();

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

export const actions = {
  create: async ({ request, cookies }) => {
    const token = cookies.get("token");

    const formData = await request.formData();
    const name = formData.get("name");
    const genre = formData.get("genre");
    const releaseDate = formData.get("releaseDate");
    const albumType = formData.get("albumType"); //change it to drop down list 
    const album = { name, genre, releaseDate, albumType };

    try {
      const res = await fetch(`${API_BASE_URL}/api/albums`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(album),
      });

      const data = await res.json();

      if (!res.ok) {
        return fail(409, {
          error: data.message,
          errors: data.errors,
          name, 
          genre,
          releaseDate,
          albumType,
           
        });
      }

      return { success: true, message: data.message };
    } catch (err) {
      return fail(500, {
        success: false,
        error: err.message,
          name, 
          genre,
          releaseDate,
          albumType,
            
      });
    }
  },
  delete: async ({ request, cookies, fetch }) => {
    const token = cookies.get("token");

    const formData = await request.formData();
    const id = formData.get("id");

    if (!id) {
      return fail(400, { error: "Missing album id" });
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/albums/${id}`, {
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
          error: data?.message || "Failed to delete album",
        });
      }

      return { success: true, message: data?.message ?? "Album deleted" };
    } catch (err) {
      return fail(500, {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  },
  update: async ({ request, cookies }) => {
    const token = cookies.get("token");
    const formData = await request.formData();
    const id = formData.get("id");
    const name = formData.get("name");
    const genre = formData.get("genre");
    const releaseDate = formData.get("releaseDate");
    const albumType = formData.get("albumType"); //change it to drop down list 

    if (!id) {
      return fail(400, { error: "Missing album id" });
    }

    const album = { name, birthYear, bio };

    try {
      const res = await fetch(`${API_BASE_URL}/api/albums/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(album),
      });

      const data = await res.json();

      if (!res.ok) {
        return fail(res.status, {
          error: data?.message || "Failed to update album",
          errors: data?.errors,
          name,
          genre,
          releaseDate,
          albumType,

        });
      }

      return { success: true, message: data.message ?? "Album updated" };
    } catch (err) {
      return fail(500, {
        success: false,
        error: err instanceof Error ? err.message : String(err),
        name,
        birthYear,
        bio,
      });
    }
  },
};