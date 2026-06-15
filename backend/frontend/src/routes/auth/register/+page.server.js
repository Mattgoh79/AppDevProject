import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";

const API_BASE_URL = env.API_BASE_URL || "http://localhost:3000";

export const actions = {
  register: async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const gender= formData.get("gender");
    const role = formData.get("role");
    const bio = formData.get("bio");
    const user = { username, email, password, gender, role, bio };

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        return fail(409, {
          success: false,
          error: data.message,
          errors: data.errors,
          username, 
          email, 
          password, 
          gender, 
          role, 
          bio
        });
      }

      return { success: true, message: data.message };
    } catch (err) {
      return fail(500, {
        success: false,
        error: err.message,
          username, 
          email, 
          password, 
          gender, 
          role, 
          bio
          
      });
    }
  },
};